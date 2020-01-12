/**
 * Record Type
 */
class RecordType {
  /**
   * Creates a new instance of a RecordType
   *
   * @constructor
   * @param {string} type Record type
   * @param {string} description Record type description
   * @param {string} details Record type details
   */
  constructor(type, description, details) {
    this.type = type;
    this.description = description;
    this.details = details;
  }
}

module.exports = RecordType;
