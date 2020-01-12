const express = require('express');
const system = require('../utilities/system');
const converter = require('../utilities/converter');

// eslint-disable-next-line new-cap
const router = express.Router();

/* GET zone listing. */
router.get('/', async function(req, res, next) {
  if (!req.user) {
    return res.status(401).send();
  }

  const zoneFileString = await system.readZoneFile();
  const zoneFile = converter.parseZoneFile(zoneFileString);

  res.send(zoneFile);
});

/* PUT zone */
router.put('/', async function(req, res, next) {
  if (!req.user) {
    return res.status(401).send();
  }

  let originalZoneFileString = '';
  try {
    originalZoneFileString = await system.readZoneFile();
    const originalZoneFile = converter.parseZoneFile(originalZoneFileString);

    const updateZoneFile = req.body;
    updateZoneFile.soa.serial = originalZoneFile.soa.serial + 1;
    const updateZoneFileString = converter.stringifyZoneFile(updateZoneFile);
    await system.saveZoneFile(updateZoneFileString);

    await system.validateZoneFile();
    await system.restartBind();

    res.send(updateZoneFile);
  } catch (e) {
    if (originalZoneFileString) {
      await system.saveZoneFile(originalZoneFileString);
      await system.restartBind();
    }

    res.status(500).send(e);
  }
});

module.exports = router;
