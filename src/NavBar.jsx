import React, { Component } from 'react';

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">ChatPage</a>
        <span className="userCounter" >{this.props.amountOfUsers} users online</span>
      </nav>
    );
  }
}
export default NavBar;

