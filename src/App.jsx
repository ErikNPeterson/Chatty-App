import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentUser: { name: "Bob" },
      messages: []
    }

    this.createMessage = this.createMessage.bind(this);
    this.newUser = this.newUser.bind(this);

  }
  //////

  newUser(userName) {
    this.setState({ currentUser: { name: userName } });
  }

  createMessage(content) {
    const newMessage = { username: this.state.currentUser.name, content: content };
    // sending our message to the server.
    this.exampleSocket.send(JSON.stringify(newMessage));
  }

  componentDidMount() {
    console.log("componentDidMount <App />");

    this.exampleSocket = new WebSocket("ws://localhost:3001");

    this.exampleSocket.onmessage = (evt) => {
      const messages = this.state.messages.concat(JSON.parse(evt.data));
      this.setState({ messages: messages });
    }

    setTimeout(() => {
      console.log("Simulating incoming message(this is from set Timeout in Component did mount)");
      // Add a new message to the list of messages in the data store
      const newMessage = { id: 3, username: "Michelle", content: "Hello there!" };
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({ messages: messages })
    }, 3000);

  }

  render() {
    return (
      <div>
        <NavBar />
        <MessageList messages={this.state.messages} />
        <ChatBar userName={this.state.currentUser.name} createMessage={this.createMessage} newUser={this.newUser} />
      </div>
    );
  }
}
export default App;