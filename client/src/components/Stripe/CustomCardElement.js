import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import axios from 'axios'
import {Redirect} from "react-router-dom";

class CustomCardElement extends Component
{
  state = 
  {
    redirect : false
  }
  render()
  {
    var page = this
    if (this.state.redirect)
      return <Redirect to="/orders" />
    return (
      <form onSubmit={(event) =>
        {
            event.preventDefault()
            if (page.props.stripe)
            {
              page.setState({enabled:true})
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
                    .then((response) => {
                      page.setState({redirect:true})
                    })
                  
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