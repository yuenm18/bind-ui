const express = require('express');
const system = require('../utilities/system');
const converter = require('../utilities/converter');

// eslint-disable-next-line new-cap
const router = express.Router();

/* GET zone listing. */
router.get('/', async function(req, res, next) {
  // check if request is authenticated
  if (!req.user) {
    return res.status(401).send();
  }

  const zoneFileString = await system.readZoneFile();
  const zoneFile = converter.parseZoneFile(zoneFileString);

  res.send(zoneFile);
});

/* PUT zone */
router.put('/', async function(req, res, next) {
  // check if request is authenticated
  if (!req.user) {
    return res.status(401).send();
  }

  let originalZoneFileString = '';
  try {
    console.log('Backing up old zone file');
    originalZoneFileString = await system.readZoneFile();
    const originalZoneFile = converter.parseZoneFile(originalZoneFileString);

    console.log('Updating zone file');
    const updateZoneFile = req.body;
    updateZoneFile.soa.serial = originalZoneFile.soa.serial + 1;
    const updateZoneFileString = converter.stringifyZoneFile(updateZoneFile);
    await system.saveZoneFile(updateZoneFileString);

    console.log('Validating zone file');
    await system.validateZoneFile();

    console.log('Restarting BIND');
    await system.restartBind();

    res.send(updateZoneFile);
  } catch (e) {
    console.error('Error updating zone file', e);
    if (originalZoneFileString) {
      try {
        console.log('Restoring zone file');
        await system.saveZoneFile(originalZoneFileString);
        console.log('Restarting BIND');
        await system.restartBind();
      } catch (e) {
        console.error('Error restoring bind file', e);
      };
    }

    res.status(500).send(e);
  }
});

module.exports = router;
