import React, { Component } from 'react';
import HomeContainer from "./components/container/HomeContainer";
import FooterContainer from './components/container/FooterContainer';
import HeaderContainer from './components/container/HeaderContainer';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <HeaderContainer/>
        <HomeContainer/>
        <FooterContainer/>
      </React.Fragment>
    );
  }
}

export default App;
