import React from 'react';
import MaterialTable from 'material-table';
import PropTypes from 'prop-types';
import { recordTypes } from '../../../constants/record-types';

/**
 * Record component
 *
 * @param {Object} props The properties
 * @return {JSX} The record component
 */
export default function RecordSet(props) {
  return (
    <MaterialTable
      columns={[
        {
          field: 'name',
          title: 'Name',
        },
        {
          field: 'ttl',
          title: 'TTL',
          type: 'numeric',
          initialEditValue: props.defaultTTL,
        },
        {
          field: 'type',
          title: 'Type',
          lookup: recordTypes,
        },
        {
          field: 'data',
          title: 'Data',
        },
      ]}
      data={props.records}
      editable={{
        isEditable: () => true,
        isDeletable: () => true,
        onRowAdd: (record) => props.handleAddRecord(record),
        onRowUpdate: (newRecord, oldRecord) =>
          props.handleUpdateRecord(newRecord, oldRecord),
        onRowDelete: (record) => props.handleDeleteRecord(record),
      }}
      localization={{
        header: {
          actions: '',
        },
      }}
      options={{
        actionsColumnIndex: 4,
      }}
      title="DNS Records"
    ></MaterialTable >
  );
}

RecordSet.propTypes = {
  defaultTTL: PropTypes.number.isRequired,
  records: PropTypes.array.isRequired,
  handleAddRecord: PropTypes.func.isRequired,
  handleUpdateRecord: PropTypes.func.isRequired,
  handleDeleteRecord: PropTypes.func.isRequired,
};

