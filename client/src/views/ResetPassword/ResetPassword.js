import React from 'react'
import axios from 'axios';
import qs from "query-string"

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { ErrorMessage, Formik } from 'formik'

class ResetPassword extends React.Component
{
    render() {
        var urlUsername = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).username
        var urlCode = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).code
        return (
            <Container className="p-3">
            <Formik
                  initialValues={{    
                    password: ''
                  }}
                  /*validationSchema={SignupSchema}*/
                  onSubmit={(values, obj) =>
                  {
                      var params = {
                          username: urlUsername,
                          password: values.password,
                          code: urlCode
                      }
                      axios.post('/api/change-password', params)
                      .then((response) =>
                      {
                        var message = response.data.message
                        
                        if (message.name == "success")
                            //success code
                        console.log(message)
                        
                      })
                  }}
                >
                  {({
                    values,
                    handleChange,
                    handleSubmit
                  }) => (
              <Form onSubmit={handleSubmit}> 
                  <Form.Group>
                      <Form.Label>New Password</Form.Label>
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
                  
                  <Button variant="primary" type="submit">Reset Password</Button>
              </Form>
              )}
              </Formik>
          </Container>
        )
    }
}
export default ResetPassword