const SOA = require('../models/soa');
const Record = require('../models/record');
const ZoneFile = require('../models/zone-file');

/**
 * Parses the zone file
 *
 * @param {string} zoneFileString The string representation of the zone file
 * @return {ZoneFile} The zone file
 */
function parseZoneFile(zoneFileString) {
  const zoneFileLines = zoneFileString.split('\n').map((s) => s.trim());

  const records = [];
  let soa = new SOA();
  for (const zoneFileLine of zoneFileLines) {
    const lineItems = zoneFileLine.split(/[ ]+/);
    if (!lineItems.length) {
      continue;
    }

    // no variable lines in zonefile
    if (lineItems[0].startsWith('$')) {
      continue;
    }

    if (lineItems.length === 11) {
      soa = new SOA(lineItems[4], lineItems[5], +lineItems[6],
          +lineItems[7], +lineItems[8], +lineItems[9], +lineItems[10]);
    }

    if (lineItems.length === 5) {
      const record = new Record(lineItems[0], +lineItems[1], lineItems[3],
          lineItems[4]);
      records.push(record);
    }
  }

  const zoneFile = new ZoneFile(process.env.ORIGIN, process.env.TTL, soa,
      records);
  return zoneFile;
}

/**
 * Stringifies the zone file
 *
 * @param {ZoneFile} zoneFile The zone file
 * @param {number} serial The serial number
 * @return {string} The string representation of the zone file
 */
function stringifyZoneFile(zoneFile, serial) {
  const origin = `$ORIGIN ${process.env.ORIGIN}`;
  const ttl = `$TTL ${process.env.TTL}`;
  const soa = `@ IN SOA ${zoneFile.soa.mname} ${zoneFile.soa.rname} \
${zoneFile.soa.serial} ${zoneFile.soa.refresh} ${zoneFile.soa.retry} \
${zoneFile.soa.expire} ${zoneFile.soa.ttl}`;

  let zoneFileString = `${origin}\n${ttl}\n${soa}\n`;
  for (const record of zoneFile.records) {
    zoneFileString += `${record.name} ${record.ttl} IN ${record.type} \
${record.data}\n`;
  }

  return zoneFileString;
}

module.exports.stringifyZoneFile = stringifyZoneFile;
module.exports.parseZoneFile = parseZoneFile;
