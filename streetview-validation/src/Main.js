import React, { Component } from 'react';
import logo from './logo.svg';
import HomeContainer from "./components/container/HomeContainer";

class Main extends Component {
  render() {
    return (
      <div className="Main">
        <HomeContainer/>
      </div>
    );
  }
}

export default Main;
