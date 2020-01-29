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
  let defaultTTL = 86400;
  let soa = new SOA();
  for (const zoneFileLine of zoneFileLines) {
    const lineItems = zoneFileLine.split(/[ ]+/);
    if (!lineItems.length) {
      continue;
    }

    // no variable lines in zonefile
    if (zoneFileLine.startsWith('$')) {
      if (lineItems[0] === '$TTL') {
        defaultTTL = +lineItems[1];
      }
      continue;
    } else if (zoneFileLine.startsWith('@ IN SOA')) {
      soa = new SOA(lineItems[3], lineItems[4], +lineItems[5], +lineItems[6],
          +lineItems[7], +lineItems[8], +lineItems[9]);
    } else if (lineItems.length >= 5) {
      const indexOfFifthItem = lineItems[0].length +
          lineItems[1].length + lineItems[2].length + lineItems[3].length + 4;
      const record = new Record(lineItems[0], +lineItems[1], lineItems[3],
          parseData(zoneFileLine.substring(indexOfFifthItem)));
      records.push(record);
    }
  }

  const zoneFile = new ZoneFile(process.env.ORIGIN, defaultTTL, soa,
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
  const ttl = `$TTL ${zoneFile.defaultTTL}`;
  const soa = `@ IN SOA ${zoneFile.soa.mname} ${zoneFile.soa.rname} \
${zoneFile.soa.serial} ${zoneFile.soa.refresh} ${zoneFile.soa.retry} \
${zoneFile.soa.expire} ${zoneFile.soa.ttl}`;

  let zoneFileString = `${origin}\n${ttl}\n${soa}\n`;
  for (const record of zoneFile.records) {
    zoneFileString += `${record.name} ${record.ttl} IN ${record.type} \
${sanitizeData(record.data)}\n`;
  }

  return zoneFileString;
}

/**
 * Sanitizes the data of a zone record.
 * If there are spaces, it wraps the value in double quotes
 * and escapes the existing double quotes
 *
 * @param {string} data The data
 * @return {string} The sanitized data
 */
function sanitizeData(data) {
  return data.includes(' ') ? `"${data.replace(/"/g, '\\"')}"` : data;
}

/**
 * Parses the data of a zone record.
 *
 * @param {string} data The data
 * @return {string} The parsed data
 */
function parseData(data) {
  return data.startsWith('"') && data.endsWith('"') ?
    data.substring(1, data.length - 1).replace(/\\"/g, '"') :
    data;
}


module.exports.stringifyZoneFile = stringifyZoneFile;
module.exports.parseZoneFile = parseZoneFile;
