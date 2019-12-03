import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect, Link} from "react-router-dom";
import SignUp from './views/SignUp/SignUp'
import Login from './views/Login/Login'
import Home from './views/Home/Home'
import VerifyEmail from './views/Verify-Email/Verify-Email'
import Quote from './views/Quote/Quote'
import NavBar from './components/Navbar'
import NotFound from "./views/NotFound/NotFound"
import Material from "./components/Quote/Material"
import MaterialView from "./views/MaterialView"
import CartView from './views/CartView';
import 'bootstrap/dist/css/bootstrap.min.css';
import PrivateRoute from './components/PrivateRoute';
import styles from './assets/theme.scss.css';
import Accepted from './components/Accepted';
import Status from './components/Status';
import Orders from './views/Orders/Orders';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/verify-email" component={VerifyEmail} />
        <Route exact path="/" component={Home} />
        <PrivateRoute exact path="/protected" component={Quote} />
        <PrivateRoute exact path="/accepted" component={Accepted} />
        <PrivateRoute exact path="/status" component={Status} />
        <PrivateRoute exact path="/material" component={MaterialView} />
        <PrivateRoute exact path="/orders" component={Orders} />
        <Route path="*" component={NotFound}/>
      </Switch>
    </Router>
  );

    /*return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/Home" component={Home} />
          <Route exact path="/mat" component={MaterialView} />
          <Route exact path="/cart" component={CartView} />
          <Route exact path="/">
            <Redirect to="/Home" />
          </Route>
          <Route component={NotFound}/>
        </Switch>
      </div>
    );*/
}

export default App;
