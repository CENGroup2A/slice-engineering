import React from 'react'
import axios from 'axios'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    Link
  } from "react-router-dom";

import AuthContext from '../context/AuthContext'

class PrivateRoute extends React.Component
{
    static contextType = AuthContext;
    render()
    {
        var comp = this
        var { component: Component, ...rest } = this.props
        return (
            <Route {...rest} render={(props) => (
                comp.context.auth ?
                <Component {...props} />
                  :
                <Redirect to='/login' />
              )} />
        )
    }
}

export default PrivateRoute
