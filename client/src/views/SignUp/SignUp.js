import React from 'react'
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import { ErrorMessage, Formik } from 'formik'
import * as Yup from 'yup';

var axios = require('axios')

const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Your name is too short.')
      .max(70, 'Your name is too long')
      .required('Required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Required'),
    username: Yup.string()
      .max(70, "Your email is too long")
      .required('Required'),
    password: Yup.string()
      .max(70, "Your passowrd is too long")
      .required('Required'),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
  });


const SignUp = () =>
{
    return (
        <Container className="p-3">

<Formik
      initialValues={{      
        name: '',
        passwordConfirm: '',
        password: '',
        username: ''
      }}
      validationSchema={SignupSchema}
      onSubmit={(values, obj) =>
      {
          axios.post('/api/signup', values)
          .then((response) =>
          {
            console.log(response)
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
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your Name"
                        id="name"
                        name="name"
                        onChange={handleChange}
                        value={values.name} />
                    
                    <ErrorMessage name="name" />

                </Form.Group>

                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your Username"
                        id="username"
                        name="username"
                        onChange={handleChange}
                        value={values.username} />

                    <ErrorMessage name="username" />

                </Form.Group>

                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your Email"
                        id="email"
                        name="email"
                        onChange={handleChange}
                        value={values.email} />

                    <ErrorMessage name="email" />

                </Form.Group>

                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        id="password"
                        name="password"
                        onChange={handleChange}
                        value={values.password} />
                    
                    <ErrorMessage name="password" />

                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        id="passwordConfirm"
                        name="passwordConfirm"
                        onChange={handleChange}
                        value={values.passwordConfirm} />
                    
                    <ErrorMessage name="passwordConfirm" />

                </Form.Group>
                
                <Button variant="primary" type="submit">Sign Up</Button>
            </Form>
            )}
            </Formik>
        </Container>
    )
}

export default SignUp
