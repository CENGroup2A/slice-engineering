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
import VerifyEmail from './views/Verify-Email/Verify-Email'
import Quote from './views/Quote/Quote'
import NavBar from './components/Navbar'

import 'bootstrap/dist/css/bootstrap.min.css';
import PrivateRoute from './components/PrivateRoute';


const App = () => {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/verify-email" component={VerifyEmail} />
        <Route exact path="/" component={Home} />
        <PrivateRoute exact path = "/protected" component={Quote} />
        <Route path="*">
          <p>well this is awkward, huh?</p>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
