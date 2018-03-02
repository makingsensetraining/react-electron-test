
const initialState = {
  channels: [],
  errors: [],
};

let chatId = 0;
const getChatId = () => chatId += 1;

const Chat = (state = initialState, action) => {
  switch (action.type) {
  case 'CHAT_CREATED_CHANNEL':
    return { ...state, channels: [...state.channels, { name: action.channel, id: getChatId(), messages: [] }] };
  case 'CHAT_RECEIVE_MESSAGE':
    return {
      ...state,
      channels: state.channels.map((channel) => {
        if (channel.name === action.channel) {
          channel.messages.push({
            message: action.message,
            id: getChatId(),
          });
        }
        return channel;
      }),
    };
  default:
    return state;
  case 'CHAT_ERROR_CREATE_CHANNEL':
    return { ...state, errors: [...state.errors, { error: action.error, id: getChatId() }] };
  }
};

export default Chat;
