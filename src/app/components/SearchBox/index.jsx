import React from 'react';
import PropTypes from 'prop-types';
import { composePure, withState, withHandlers } from '../../utils/composepure';

const SearchBox = ({ value, setValue, submit }) => (
  <form className="form-inline" onSubmit={submit}>
    <label className="sr-only" htmlFor="inlineFormInput">Query: </label>
    <input
      type="text"
      className="form-control mb-2 mr-sm-2 mb-sm-0"
      id="inlineFormInput"
      placeholder="search...."
      value={value}
      onChange={(event) => setValue(event.target.value)}
    />
    <button type="submit" className="btn btn-primary">Search</button>
  </form>
);

SearchBox.propTypes = {
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
};

export default composePure(
  withState('value', 'setValue', ''),
  withHandlers({
    submit: props => (event) => {
      event.preventDefault();
      props.onSearchSubmit(props.value);
    },
  }),
)(SearchBox);
