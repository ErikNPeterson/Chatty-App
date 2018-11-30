ChatPage (React App)
=====================

ChatPage (formerly Chatty) will allow users to communicate with each other without having to register accounts. ChatPage uses the React front-end library created and used heavily by Facebook as well as modern tools for Node including Webpack and Babel.

ChatPage has real-time functionality where the user does not have to reload the page in order to see updates. Each user is assigned a random colour for their username when connected to the server. When a user changes their name other users are notified and the colour for their name will remain the same.


## Home Page
!['home page'](https://github.com/ErikNPeterson/Chatty-App/blob/master/docs/chattyEmpty.png)

## Conversation
!['Conversation'](https://github.com/ErikNPeterson/Chatty-App/blob/master/docs/chattyConversation.png)

## Name Change Notifications with Persistent Colour!
!['Name in Colour/ Notifications'](https://github.com/ErikNPeterson/Chatty-App/blob/master/docs/chattyColourName.png)



### Usage

```
git clone git@github.com:lighthouse-labs/react-simple-boilerplate.git
cd react-simple-boilerplate
git remote rm origin
git remote add origin [YOUR NEW REPOSITORY]
# Manually update your package.json file
```

Install the dependencies and start the server.

```
npm install
npm start
open http://localhost:3000
```

### Static Files

You can store static files like images, fonts, etc in the `build` folder.

For example, if you copy a file called my_image.png into the build folder you can access it using `http://localhost:3000/build/my_image.png`.

### Linting

This boilerplate project includes React ESLint configuration.

```
npm run lint
```

### Dependencies

* React
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
* Babel-core
* Babel-preset-es2015
* Babel-preset-react
* Babel-preset-stage-0
* Eslint
* Eslint-plugin-react
* Css-loader
* Node-sass
* Sass-loader
* Sockjs-client
* Style-loader
* React
* React-dom
