import React, {Component} from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import CustomCardElement from './CustomCardElement';
const axios = require('axios');

class App extends Component
{
  getAPI = () =>
  {
    // axios.get("/api/stripe")
    // .then(() =>)
  }
  
  render()
  {
    return (
      <StripeProvider apiKey="pk_test_TYooMQauvdEDq54NiTphI7jx">
          <Elements>
            <CustomCardElement />
          </Elements>
      </StripeProvider>
    );
  }
}

export default App;