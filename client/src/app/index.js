import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import {
  AboutPage,
  LandingPage
} from './containers';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/about" component={AboutPage} />
        <Route exact path="/" component={LandingPage} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;