/**
 * A Zone File
 */
class ZoneFile {
  /**
   * Creates an instance of a Zone File
   *
   * @constructor
   * @param {string} origin The origin
   * @param {number} defaultTTL The default TTL
   * @param {SOA} soa The SOA record
   * @param {Array<Record>} records The resource records
   */
  constructor(origin, defaultTTL, soa, records) {
    this.origin = origin,
    this.defaultTTL = defaultTTL;
    this.soa = soa;
    this.records = records;
  }
}

module.exports = ZoneFile;
