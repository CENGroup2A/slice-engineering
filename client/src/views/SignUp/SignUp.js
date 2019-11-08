import React from 'react'
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import { useFormik } from 'formik'

var axios = require('axios')


const SignUp = () =>
{
    const formik = useFormik({
        initialValues: {      
          name: '',
          confirmPassword: '',
          password: '',
          username: ''
        },
        onSubmit: values =>
        {
            axios.post('/api/signup', values)
        }
      });

    return (
        <Container className="p-3">
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your Name"
                        id="name"
                        name="name"
                        onChange={formik.handleChange}
                        value={formik.values.name} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your Name"
                        id="username"
                        name="username"
                        onChange={formik.handleChange}
                        value={formik.values.username} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        id="password"
                        name="password"
                        onChange={formik.handleChange}
                        value={formik.values.password} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        id="confirmPassword"
                        name="confirmPassword"
                        onChange={formik.handleChange}
                        value={formik.values.passwordName} />
                </Form.Group>
                
                <Button variant="primary" type="submit">Sign Up</Button>
            </Form>
        </Container>
    )
}

export default SignUp
