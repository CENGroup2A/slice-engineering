import React from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import Home from "./views/Home/Home"
import NotFound from "./views/NotFound"
import Header from "./components/Header/Header"
import SignUp from './views/SignUp/SignUp'

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <SignUp />
  );
}

export default App;
