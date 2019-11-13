import React from 'react'
import axios from 'axios';
import qs from "query-string"

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { ErrorMessage, Formik } from 'formik'

class ForgotPassword extends React.Component
{
    verify = () => {
        var urlCode = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).code
        var urlUsername = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).username
        let success = false;
        axios.post("http://localhost:5000/api/verify-email", {
            code: urlCode,
            username: urlUsername
        })
        .then(function (result) {
            success = true;
            console.log('hello')
        })
        this.setState({
            verified: success
        })
    }

    render() {
        return (
            <Container className="p-3">
                <Formik
                initialValues={{      
                  username: '',
                  email: ''
                }}
                //validationSchema={LoginSchema}
                onSubmit={(values, obj) =>
                {
                    axios.post('/api/reset-password', values)
                    .then((response) =>
                    {
                      var message = response.data.message
                      
                      if (message.name == "success")
                        //success code

                      window.location.reload();
                    })
                }}
              >
                {({
                  values,
                  handleChange,
                  handleSubmit
                }) => (
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="username"
                            name="username"
                            placeholder="Enter username"
                            onChange={handleChange}
                            value={values.username} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Email"
                            onChange={handleChange}
                            value={values.email} />
                    </Form.Group>
                    <Button variant="primary" type="submit">Submit</Button>
                </Form>
                )}
            </Formik>
            </Container>
        )
    }
}
export default ForgotPassword