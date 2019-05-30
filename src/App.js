import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import HomeContainer from "./components/container/HomeContainer";
import FooterContainer from './components/container/FooterContainer';
import HeaderContainer from './components/container/HeaderContainer';

class App extends Component {
  render() {
    return (
    <Router>
        <HeaderContainer/>
        <Route path='/' component={HomeContainer} />
        <FooterContainer/>
     </Router>
    );
  }
}

export default App;
