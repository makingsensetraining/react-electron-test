import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Snackbar from 'material-ui/Snackbar';

import { composePure, withProps } from '../../utils/composepure';

const options = [
  { label: 'Home', path: '/' },
  { label: 'Upload', path: '/upload' },
];

const GenerateMenu = ({ component, location, openNotification, closeNotification }) => (
  <div key="mainAppContainer">
    <nav className="navbar navbar-default">
      <ul className="nav nav-pills nav-fill">
        {options.map(l => (
          <li key={`key-${l.label}`} className="nav-item">
            <Link className={`nav-link ${location.pathname === l.path ? 'active' : ''}`} href={l.path} to={l.path}>{l.label}</Link>
          </li>
        ))}
      </ul>
      <form className="form-inline my-2 my-lg-0">
        <input className="form-control mr-sm-2" type="text" placeholder="Search" />
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
    </nav>

    <div key="mainSectionContainer">
      {component}
    </div>
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={openNotification}
      onRequestClose={closeNotification}
      SnackbarContentProps={{
        'aria-describedby': 'message-id',
      }}
      message={<span id="message-id">Operation finish</span>}
    />
  </div>
);

GenerateMenu.propTypes = {
  component: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  closeNotification: PropTypes.func.isRequired,
  openNotification: PropTypes.bool.isRequired,
};

export default composePure(
  connect(state => ({
    openNotification: state.Universal.toggles.openNotification,
  }),
  dispatch => ({
    closeNotification: () => dispatch({ type: 'TOGGLE_PROP', key: 'openNotification' }),
  }),
  ),
  withRouter,
  withProps(props => props),
)(GenerateMenu);
