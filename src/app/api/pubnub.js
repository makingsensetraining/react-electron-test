import PubNubReact from 'pubnub-react';

class EmptyChatComponent {
  constructor() {
    this.state = {};
  }

  setState(s) {
    this.state = s(this.state);
  }
  render() { }
}

class PubNub {
  constructor() {
    this.pubnub = new PubNubReact({
      publishKey: 'pub-c-d14ede36-292b-482d-a5f0-6693ed869320',
      subscribeKey: 'sub-c-8c8a113a-0676-11e8-a3ca-729d92310bb2',
    });
    this.pubnub.init(new EmptyChatComponent());
  }

  createChannel(name, action) {
    this.pubnub.subscribe({ channels: [name], withPresence: true });
    this.pubnub.getMessage(name, msg => action(name, msg));
  }

  publish(channel, message) {
    this.pubnub.publish({ message, channel });
  }

  closeChannel(channel) {
    this.pubnub.unsubscribe({ channels: [channel] });
  }
}

export default PubNub;
