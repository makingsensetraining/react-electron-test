import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import { composePure } from '../../utils/composepure';
import PropTypes from '../../utils/propTypesTables';

const defaultFilterMethod = (filter, row) => {
  const id = filter.pivotId || filter.id;
  return row[id] !== undefined ? String(row[id]).toLowerCase().indexOf(filter.value.toLowerCase()) > -1 : true;
};


const OwnTable = ({ rows, columns, limit, page, total, onChangePage }) => (
  <div>
    <ReactTable
      data={rows}
      columns={columns}
      className="-striped -highlight"
      defaultFilterMethod={defaultFilterMethod}
      showPaginationTop={true}
      resizable={true}
      filterable={true}
      defaultPageSize={limit}
      pageSize={limit}
      pages={total}
      page={page ? page - 1 : 0}
      onPageChange={onChangePage}
      pageSizeOptions={[30]}
      manual
    />
  </div>
);


OwnTable.propTypes = PropTypes;

export default composePure()(OwnTable);
