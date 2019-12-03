import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import axios from 'axios'

class CustomCardElement extends Component
{
  render()
  {
    var page = this
    console.log(page.props)
    return (
      <form onSubmit={(event) =>
        {
            event.preventDefault()
            if (page.props.stripe)
            {
                page.props.stripe.createToken()
                .then(this.props.handleResult)
                .then((token) => {
                  if (token.error)
                    return

                    
                    axios.post("/api/submit-cart", 
                    {
                      shippment: {...this.props.shippment},
                      token: this.props.token,
                      stripeToken: token
                    })
                    .then((response) => console.log(response))
                  
                })
            }
            else
                console.log("Stripe.js hasn't loaded yet.");
            
        }}>
        <CardElement style={{base: {fontSize: '16px'}}} />
        <button className={"btn btn-primary btn-lg btn-block mt-3 " + (page.props.enabled ? "" : "disabled")} type="submit">Buy Now</button>
      </form>
    );
  }
}

export default injectStripe(CustomCardElement);