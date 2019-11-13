import React from 'react'
import axios from 'axios';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import qs from "query-string"

class VerifyEmail extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
          verified: false
        };
    }

    verify = () => {
        var urlCode = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).code
        var urlUsername = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).username
        let success = false;
        axios.post("http://localhost:5000/api/verify-email", {
            code: urlCode,
            username: urlUsername
        })
        .then(function (result) {
            //success = true;
            console.log('hello')
        })
        /*this.setState({
            verified: success
        })*/
    }

    render()
    {
        this.verify()
        //console.log(this.state.verified)
        return(
            <p>Hello</p>
        )
    }
}

export default VerifyEmail