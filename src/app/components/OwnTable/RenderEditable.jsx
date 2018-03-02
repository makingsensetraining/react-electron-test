import React from 'react';

const renderEditable = (rows, updateHandler) => cellInfo => (
  <div
    style={{ backgroundColor: '#fafafa' }}
    contentEditable
    suppressContentEditableWarning
    onBlur={(e) => {
      rows[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
      updateHandler(rows[cellInfo.index]);
    }}
    dangerouslySetInnerHTML={{
      __html: rows[cellInfo.index][cellInfo.column.id],
    }}
  />
);


export default renderEditable;
