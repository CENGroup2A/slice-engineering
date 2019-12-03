import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';

class CustomCardElement extends Component
{
  render()
  {
    return (
        <CardElement style={{base: {fontSize: '20px'}}} />
    );
  }
}

export default injectStripe(CustomCardElement);