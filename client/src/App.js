import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import SignUp from './views/SignUp/SignUp'
import Login from './views/Login/Login'
import Home from './views/Home/Home'

import 'bootstrap/dist/css/bootstrap.min.css';
import PrivateRoute from './components/PrivateRoute';

function Auth()
{
  return (
    <p>Authenticated</p>
  )
}

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Home} />
        <PrivateRoute exact path = "/protected" component={Auth} />
        <Route path="*">
          <p>djkhsajds</p>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
