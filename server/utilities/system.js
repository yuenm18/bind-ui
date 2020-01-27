const { spawn } = require('child_process');
const fsPromises = require('fs').promises;

/**
 * Validates zone file
 *
 * @return {Promise<string>} Promise containing the output of the validation
 */
function validateZoneFile() {
  return new Promise((resolve, reject) => {
    const validate = spawn('named-checkzone', [
      process.env.ORIGIN,
      process.env.ZONE_FILE,
    ]);

    let output = '';

    validate.stdout.on('data', (data) => {
      output += data;
    });

    validate.stderr.on('data', (data) => {
      output += data;
    });

    validate.on('close', (code) => {
      !code ? resolve(output) : reject(output);
    });

    validate.on('error', (err) => {
      console.error('Unable to run "namedcheckzone." Ensure it is installed, ' +
      'accessible in $PATH and can be run by this user', err);
    });
  });
}

/**
 * Restarts Bind
 *
 * @return {Promise<string>} Promise containing the output for restarting Bind
 */
function restartBind() {
  return new Promise((resolve, reject) => {
    const restart = spawn('rndc', ['reload']);

    let output = '';

    restart.stdout.on('data', (data) => {
      output += data;
    });

    restart.stderr.on('data', (data) => {
      output += data;
    });

    restart.on('close', (code) => {
      !code ? resolve(output) : reject(output);
    });

    restart.on('error', (err) => {
      console.error('Unable to run "rndc." Ensure it is installed, ' +
      'accessible in $PATH and can be run by this user', err);
    });
  });
}

/**
 * Reads the zone file
 *
 * @return {string} A promise containing the zone file contents
 */
async function readZoneFile() {
  const file = await fsPromises.open(process.env.ZONE_FILE, 'r');
  const zoneFileContents = (await file.readFile()).toString();
  await file.close();
  return zoneFileContents;
}

/**
 * Writes the zone file
 *
 * @param {string} zoneFile The zone file
 * @return {string} A promise
 */
async function saveZoneFile(zoneFile) {
  const file = await fsPromises.open(process.env.ZONE_FILE, 'w');
  await file.writeFile(zoneFile);
  await file.close();
}

module.exports.validateZoneFile = validateZoneFile;
module.exports.restartBind = restartBind;
module.exports.readZoneFile = readZoneFile;
module.exports.saveZoneFile = saveZoneFile;
