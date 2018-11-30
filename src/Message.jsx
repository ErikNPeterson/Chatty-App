import React, { Component } from 'react';

class Message extends Component {
  render() {
    console.log('This should be our color!', this.props.message);

    if (this.props.message.type === 'incomingMessage') {
      return (
        <div className="message">
          <span className="message-username" style={{ color: this.props.color }} >{this.props.message.username}</span>
          <span className="message-content">{this.props.message.content}</span>
        </div>
      );
    } else if (this.props.message.type === 'incomingNotification') {
      return (
        <div className="message system">{this.props.message.oldName} changed their name to {this.props.message.newName}</div>
      )

    }

  }
}
export default Message;

{ }