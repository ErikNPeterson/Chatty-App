import React, { Component } from 'react';

class ChatBar extends Component {

  handleKeyPress = (cameFrom) => (event) => {
    if (event.key === 'Enter') {
      if (cameFrom === 'message') {
        this.props.createMessage(event.target.value);
        event.target.value = '';
      } else if (cameFrom === 'userName') {
        this.props.newUser(event.target.value);
      } else {
        console.log('Error not a valid message or userName');
      }
    }
  }
  render() {
    return (
      <footer className="chatbar">

        <input onKeyPress={this.handleKeyPress('userName')} className="chatbar-username" placeholder={this.props.userName} />
        <input onKeyPress={this.handleKeyPress('message')} className="chatbar-message" placeholder="Type a message and hit ENTER" />

      </footer>
    );
  }
}
export default ChatBar;
