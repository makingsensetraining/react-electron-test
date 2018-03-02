import React from 'react';
import { composePure } from '../../../utils/composepure';

const Field = ({ value, setValue, label, handler, name }) => {
  const change = event => handler(name, event.target.value);
  return (
    <div className="form-group">
      <label htmlFor="example-text-input" className="col-2 col-form-label">{label}</label>
      <div className="col-10">
        <input className="form-control" type="text" value={value} id="example-text-input" onChange={change} />
      </div>
    </div>
  );
}

export default composePure()(Field);
