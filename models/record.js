/**
 * A DNS Resource Record
 */
class Record {
  /**
    * Creates a new instance of a Record
    *
    * @constructor
    * @param {string} name The record name
    * @param {number} ttl The record's time to live
    * @param {string} type The record type
    * @param {string} data The record data
    */
  constructor(name, ttl, type, data) {
    this.name = name;
    this.ttl = ttl;
    this.type = type;
    this.data = data;
  }
}

module.exports = Record;
