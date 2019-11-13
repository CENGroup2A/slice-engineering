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
import AuthContext from './context/AuthContext'
import axios from "axios"

class App extends React.Component
{
  state =
  {
      auth : null
  }

  constructor(props)
  {
      super(props)
      var page = this
      this.loadAuth()
  }

  loadAuth = () =>
  {
    let page = this
    return axios.get("/api/auth")
          .then((response) =>
          {
              page.setState({auth: response.data.auth})
          })
  }

  render()
  {
    if (this.state.auth == null)
      return (<p>Loading...</p>)

    return (
      <Router>
        <AuthContext.Provider value={{"auth": this.state.auth, "reloadAuth": this.loadAuth}}>
          <NavBar />
          <Switch>
            <Route exact path="/sign-up" component={SignUp} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/verify-email" component={VerifyEmail} />
            <Route exact path="/" component={Home} />
            <PrivateRoute exact path = "/protected" component={Quote} />
            <Route path="*">
              <p>djkhsajds</p>
            </Route>
          </Switch>
        </AuthContext.Provider>
      </Router>
    );
  }
}

export default App;
