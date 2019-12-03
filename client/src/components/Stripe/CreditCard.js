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
      <StripeProvider apiKey="pk_test_6ZfuD9E3V6pDLKolucwjTBiN00WGoKTEqD">
          <Elements>
            <CustomCardElement {...this.props} />
          </Elements>
      </StripeProvider>
    );
  }
}

export default App;