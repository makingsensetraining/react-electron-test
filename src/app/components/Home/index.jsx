import React from 'react';
import { composePure, withProps, withHandlers } from '../../utils/composepure';
import Channel from '../Channel';

const localchannels = [];
for (let x = 0; x < 10; x += 1) localchannels.push(`channel${x}`);

const Home = ({ channels, createChannels, errors, generateMessages }) => (
  <div>
    <h1>Chat Example with PubNub</h1>
    <button onClick={createChannels}>Create Chanels</button>
    <div>
      {channels.map(channel => (
        <Channel key={channel.id} channel={channel} generateMessages={generateMessages(channel.name)} />
      ))}
    </div>
    <div>
      {errors.map(err => (
        <span key={err.id}>{err.error}</span>
      ))}
    </div>
  </div>
);


export default composePure(
  withProps(props => props),
  withHandlers({
    createChannels: props => () => localchannels.forEach(c => props.createChannel(c)),
    generateMessages: props => channel => () => {
      console.info(channel, props);
      for (let x = 0; x < 10; x += 1) props.sendMessage(channel, `testing ${x}`);
    },
  }),
)(Home);
