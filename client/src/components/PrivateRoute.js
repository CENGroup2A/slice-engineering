import React from 'react'
import axios from 'axios'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    Link
  } from "react-router-dom";

class PrivateRoute extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            isAuthenticated : true
        }

        this.checkAuthentication()
    }

    checkAuthentication = () =>
    {
        var comp = this
        axios.get("/api/auth")
        .then((response) =>
        {
            console.log(response.data.auth)
            comp.setState({ isAuthenticated: response.data.auth})
        })
    }

    render()
    {
        var comp = this
        console.log(comp.state.isAuthenticated)
        var { component: Component, ...rest } = this.props
        return (
            <Route {...rest} render={(props) => (
                comp.state.isAuthenticated ?
                <Component {...props} />
                  :
                <Redirect to='/login' />
              )} />
        )
    }
}

export default PrivateRoute
