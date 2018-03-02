
const createChannel = (name, cbMessage) => ({
  type: 'CHAT_CREATE_CHANNEL',
  name,
  cbMessage,
});

const sendMessage = (channel, message) => ({
  type: 'CHAT_SEND_MESSAGE',
  channel,
  message,
});

const receiveMessage = (channel, message) => ({
  type: 'CHAT_RECEIVE_MESSAGE',
  channel,
  message,
});

export default {
  createChannel,
  sendMessage,
  receiveMessage,
};
