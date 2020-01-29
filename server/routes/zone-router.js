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
    const newZoneFile = req.body;
    newZoneFile.soa.serial = originalZoneFile.soa.serial + 1;
    const newZoneFileString = converter.stringifyZoneFile(newZoneFile);
    await updateZoneFile(newZoneFileString);

    res.send(newZoneFile);
  } catch (e) {
    console.error('Error updating zone file', e);
    if (originalZoneFileString) {
      console.log('Restoring zone file');
      try {
        await updateZoneFile(originalZoneFileString);
      } catch (e) {
        console.error('Error restoring bind file', e);
      };
    }

    res.status(500).send(e);
  }
});

/**
 * Saves the zone file, validates it and restarts bind
 *
 * @param {string} zoneFileString The zone file string
 */
async function updateZoneFile(zoneFileString) {
  await system.saveZoneFile(zoneFileString);

  console.log('Validating zone file');
  await system.validateZoneFile();

  console.log('Restarting BIND');
  await system.restartBind();
}

module.exports = router;
