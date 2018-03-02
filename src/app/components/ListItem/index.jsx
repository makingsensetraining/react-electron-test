import React from 'react';
import Menu, { MenuItem } from 'material-ui/Menu';
import Button from 'material-ui/Button';
import { ListItemIcon, ListItemText } from 'material-ui/List';
import PropTypes from 'prop-types';

import { composePure, withState, withHandlers } from '../../utils/composepure';


let uniqueKey = 0;
const ListItemComposition =  ({ options, open, handleClick, handleRequestClose, anchorEl }) => (
  <div>
    <Button
      aria-owns={open ? 'simple-menu' : null}
      aria-haspopup="true"
      onClick={handleClick}
    >
      [ ... ]
    </Button>

    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      open={open}
      onRequestClose={handleRequestClose}
    >
      {options.map(o => (
        <MenuItem onClick={o.handler} key={`key-${uniqueKey += 1}`}>
          <ListItemIcon>
            {o.icon}
          </ListItemIcon>
          <ListItemText inset primary={`${o.label}`} />
        </MenuItem>
      ))}
    </Menu>
  </div>
);


ListItemComposition.propTypes = {
  options: PropTypes.array.isRequired,
  open: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleRequestClose: PropTypes.func.isRequired,
};

export default composePure(
  withState('open', 'setOpen', false),
  withState('anchorEl', 'setAnchorEl', null),
  withHandlers({
    handleClick: props => (event) => {
      props.setOpen(true);
      props.setAnchorEl(event.currentTarget);
    },
    handleRequestClose: props => (event) => {
      props.setOpen(false);
    },
  }),
)(ListItemComposition);
