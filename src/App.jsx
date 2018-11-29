import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentUser: { name: "DefaultUser" },
      messages: [],
      amountOfUsers: 0
    }
    //NOt needed after applying arrow functions
    // this.createMessage = this.createMessage.bind(this);
    // this.newUser = this.newUser.bind(this);
  }

  // THIS DEFINITELY HAS PROBLEMS
  newUser = userName => {
    const oldName = this.state.currentUser.name;
    this.setState({ currentUser: { name: userName } });
    const nameChange = { type: "postNotification", oldName: oldName, newName: userName };
    this.exampleSocket.send(JSON.stringify(nameChange));
  }

  createMessage = content => {
    const newMessage = { type: "postMessage", username: this.state.currentUser.name, content: content };
    // sending our message to the server.
    this.exampleSocket.send(JSON.stringify(newMessage));
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    this.exampleSocket = new WebSocket("ws://localhost:3001");

    this.exampleSocket.onmessage = (event) => {
      console.log('THIS IS THE EVENT', event);

      const data = JSON.parse(event.data);

      if (data.type === 'incomingUserUpdate') {
        this.setState({ amountOfUsers: data.amount });
      } else {

        const messages = this.state.messages.concat(JSON.parse(event.data));
        switch (data.type) {
          case "incomingMessage":
            this.setState({ messages: messages });
            break;
          case "incomingNotification":
            this.setState({ messages: messages });
            break;
          default:
            // show an error in the console if the message type is unknown
            throw new Error("Unknown event type " + data.type);
        }
      }
    }

  }

  render() {
    return (
      <div>
        <NavBar amountOfUsers={this.state.amountOfUsers} />
        <MessageList messages={this.state.messages} />
        <ChatBar userName={this.state.currentUser.name} createMessage={this.createMessage} newUser={this.newUser} />
      </div>
    );
  }
}
export default App;