import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { composePure } from '../../utils/composepure';
import Home from '../../components/Home';
import Actions from '../../actions';

console.info(Actions.Chat);
const HomeContainer = props => (
  <Home {...props} />
);

export default composePure(
  withRouter,
  connect(
    state => ({
      channels: state.Chat.channels,
      errors: state.Chat.errors,
    }),
    dispatch => ({
      createChannel: (channel) => {
        dispatch(Actions.Chat.createChannel(channel, (channelName, message) => dispatch(Actions.Chat.receiveMessage(channelName, message))));
      },
      sendMessage: (channel, message) => {
        dispatch(Actions.Chat.sendMessage(channel, message));
      },
    }),
  ),
)(HomeContainer);
