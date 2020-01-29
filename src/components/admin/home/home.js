import React from 'react';
import PropTypes from 'prop-types';
import RecordSet from './record-set';

/**
 * The Home page
 *
 * @return {JSX} The home page
 */
export default class Home extends React.Component {
  /**
   * Creates an instance of a Home component
   *
   * @param {Object} props The properties
   */
  constructor(props) {
    super(props);

    this.state = {
      records: props.records.map((r, i) => {
        r.id = i;
        return r;
      }),
    };

    this.handleAddRecord = this.handleAddRecord.bind(this);
    this.handleUpdateRecord = this.handleUpdateRecord.bind(this);
    this.handleDeleteRecord = this.handleDeleteRecord.bind(this);
  }

  /**
   * Adds a record
   *
   * @param {Record} record The record to add
   * @return {Promise} Promise resolving when add is finished
   */
  handleAddRecord(record) {
    const newRecords = this.state.records.concat([record]);

    return this.updateRecords(newRecords);
  }

  /**
   * Updates a record
   *
   * @param {Record} newRecord The updated record
   * @param {Record} oldRecord The original record
   * @return {Promise} Promise resolving when the update is finished
   */
  handleUpdateRecord(newRecord, oldRecord) {
    const newRecords = this.state.records.slice();
    const index = newRecords.findIndex((r) => r.id === oldRecord.id);
    if (index > -1) {
      newRecords.splice(index, 1, newRecord);

      return this.updateRecords(newRecords);
    }

    return Promise.reject(new Error('Could not find record in original list'));
  }

  /**
   * Deletes a record
   *
   * @param {Record} record The record to delete
   * @return {Promise} Promise resolving when the delete is finished
   */
  handleDeleteRecord(record) {
    const newRecords = this.state.records.slice();
    const index = newRecords.findIndex((r) => r.id === record.id);
    if (index > -1) {
      newRecords.splice(index, 1);

      return this.updateRecords(newRecords);
    }

    return Promise.reject(new Error('Could not find record in original list'));
  }

  /**
   * Renders the Home page
   *
   * @return {JSX} The home page
   */
  render() {
    return (
      <div>
        <h1>Home</h1>
        <RecordSet
          defaultTTL={this.props.defaultTTL}
          records={this.state.records}
          handleAddRecord={this.handleAddRecord}
          handleUpdateRecord={this.handleUpdateRecord}
          handleDeleteRecord={this.handleDeleteRecord}
        ></RecordSet>
      </div>
    );
  }

  /**
   * Updates the records
   *
   * @param {Record} records The records to update
   * @return {Promise} A promise containing the request
   */
  updateRecords(records) {
    return this.props.updateRecords(records).then((updatedRecords) => {
      this.setState({
        records: updatedRecords.map((r, i) => {
          r.id = i;
          return r;
        }),
      });
    });
  }
}

Home.propTypes = {
  defaultTTL: PropTypes.number.isRequired,
  records: PropTypes.array.isRequired,
  updateRecords: PropTypes.func.isRequired,
};
