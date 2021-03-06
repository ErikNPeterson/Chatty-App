// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuidv1 = require('uuid/v1');
const WebSocket = require('ws');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({
  server
});

function generateColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

wss.on('connection', (ws) => {
  console.log('Client connected');

  const userColor = {};
  userColor.id = uuidv1();
  userColor.type = 'color';
  userColor.color = generateColor();
  ws.send(JSON.stringify(userColor));

  // consider figuring out how to wrap this.
  const users = {};
  users.id = uuidv1();
  users.type = 'incomingUserUpdate';
  users.amount = wss.clients.size;
  wss.broadcast(JSON.stringify(users));

  ws.on('message', function incoming(data) {
    let message = JSON.parse(data);
    message.id = uuidv1();
    console.log(data);
    if (message.type === 'postMessage') {
      message.type = 'incomingMessage'
    } else if (message.type === 'postNotification') {
      message.type = 'incomingNotification'
    } else {
      console.log('unrecognized TYPE of post');
    }
    wss.broadcast(JSON.stringify(message));
  });

  ws.on('close', () => {
    users.amount = wss.clients.size;
    wss.broadcast(JSON.stringify(users));
    console.log('Client disconnected');
  })
});

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  })
}