import React from 'react';
import { composePure } from '../../utils/composepure';

const Channel = ({ channel, generateMessages }) => (
  <div>
    <h3>{channel.name}</h3>
    <div>
      <button onClick={generateMessages}>Generate messages</button>
      <ul>
        {channel.messages.map(m => (
          <li key={m.id}>{m.message.timetoken}: {m.message.message}</li>
        ))}
      </ul>
    </div>
  </div>
);

export default composePure()(Channel);
