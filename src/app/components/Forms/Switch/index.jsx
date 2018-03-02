import React from 'react';
import Switch from 'material-ui/Switch';
import { composePure } from '../../../utils/composepure';



const SwitchField = ({ label, value, handler, name }) => {
  const change = (event, checked) => handler(name, checked);
  return (
    <div className="form-group row">
      <label htmlFor="example-text-input" className="col-2 col-form-label">{label}</label>
      <div className="col-10">
        <Switch
          checked={value}
          onChange={change}
          aria-label="checkedA"
        />
      </div>
    </div>
  );
}
export default composePure()(SwitchField);
