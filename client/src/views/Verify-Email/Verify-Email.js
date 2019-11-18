import React from 'react'
import axios from 'axios';
import qs from "query-string"
import {
    Redirect
  } from "react-router-dom";

class VerifyEmail extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
          verified: false
        };

        this.verify()
    }

    verify = () => {
        var urlCode = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).code
        var urlUsername = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).username
        let success = false;
        axios.post("/api/verify-email", {
            code: urlCode,
            username: urlUsername
        })
        this.setState({
            verified: success
        })
    }

    render()
    {
        
        if (this.state.verified)
        {
            return(
                <p>Hello</p>
            )
        }

        else
        {
            return(
                <Redirect to="/" />
            )
        }
        
        
    }
}

export default VerifyEmail