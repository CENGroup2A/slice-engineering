import React from 'react'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import {
    Redirect,
    Link
  } from "react-router-dom";
import { ErrorMessage, Formik } from 'formik'
import * as Yup from 'yup';

var axios = require('axios')

const LoginSchema = Yup.object().shape({
    username: Yup.string()
      .required('Required'),
    password: Yup.string()
      .required('Required'),
  });

class Login extends React.Component {
    state = {
        continue: false
    }

    render()
    {
        var page = this

        if (this.state.continue) {
            return <Redirect to='/protected' />
        }

        return (
            <Container className="p-3">
                <Formik
                initialValues={{
                  username: '',
                  password: ''
                }}
                validationSchema={LoginSchema}
                onSubmit={(values, actions) =>
                {
                    axios.post('/api/login', values)
                    .then((response) =>
                    {
                      var message = response.data.message

                      if (message.name == "success")
                      {
                        page.setState({continue: true})
                        // TODO: rather than store the username itself, get the id assigned to it in the mongo database and store that instead
                        localStorage.setItem('user_id', values.username)
                        window.location.reload();
                      }
                      else
                      {
                        actions.setSubmitting(false);
                        if (message.name == "IncorrectPasswordError")
                          actions.setFieldError("password", "Incorrect password.")
                        else if (message.name == "IncorrectUsernameError")
                          actions.setFieldError("username", "Incorrect username.")
                      }
                    })
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting
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
                        
                        <ErrorMessage name="username" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                            value={values.password} />

                        <ErrorMessage name="password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">Submit</Button>
                    <p>Don't have an account? <Link to="/sign-up"><a>Sign up</a></Link></p>
                </Form>
                )}
            </Formik>
            </Container>
        )
    }
}


export default Login
