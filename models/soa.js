/**
 * The SOA record
 */
class SOA {
  /**
   * Creates a new instance of a SOA record
   *
   * @constructor
   * @param {string} mname The master name server for the zone
   * @param {string} rname The email address of the administrator
   * responsible for the zone
   * @param {number} serial Serial number for this zone. If a \
   * secondary name server slaved to this one observes an increase \
   * in this number, the slave will assume that the zone has been \
   * updated and initiate a zone transfer.
   * @param {number} refresh The number of seconds after which the \
   * secondary name servers should query the master for the SOA record
   * @param {number} retry The number of seconds after which secondary \
   * name servers should retry to request the serial number from the master \
   * if the master does not respond (must be less than refresh and retry)
   * @param {number} expire The number of seconds after which the name \
   * servers should stop answering requests for this zone if the master \
   * does not respond (must be bigger than refesh + retry)
   * @param {number} ttl The time to live for negative caching
   */
  constructor(mname, rname, serial, refresh, retry, expire, ttl) {
    this.mname = mname;
    this.rname = rname;
    this.serial = serial || 0;
    this.refresh = refresh || 86400;
    this.retry = retry || 7200;
    this.expire = expire || 3600000;
    this.ttl = ttl || 172800;
  }

  /**
   * Called by JSON.stringify();
   * Don't include the serial number the response
   *
   * @return {string} String representation of the object
   */
  toJSON() {
    return { ...this, serial: undefined };
  }
}

module.exports = SOA;
