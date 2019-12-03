import React from 'react'
import CreditCard from '../../components/Stripe/CreditCard'
var stateCodes = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY",	"NC", "ND", "OH", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"]

class Payment extends React.Component
{
    state = 
    {
        shippingPrice : 0,
        modelPrice : 0
    }

    componentDidMount()
    {
        var locationSate = this.props.location.state
        if (locationSate)
        {
            this.setState({shippingPrice: locationSate.shippingPrice, modelPrice: locationSate.modelPrice})
        }
    }

    render()
    {
        var {shippingPrice, modelPrice} = this.state

        return (
            <div className="container">
                <div className="row mt-4">
                    <div className="col-md-4 order-md-2 mb-4">
                        <h4 className="d-flex justify-content-between align-items-center mb-3">
                            <span className="text-muted">Your cart</span>
                            <span className="badge badge-secondary badge-pill">3</span>
                        </h4>
                        <ul className="list-group mb-3">
                            <li className="list-group-item d-flex justify-content-between lh-condensed">
                                <div>
                                    <h6 className="my-0">Model</h6>
                                    {/* <small className="text-muted">Brief description</small> */}
                                </div>
                                <span className="text-muted">${modelPrice}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between lh-condensed">
                                <div>
                                    <h6 className="my-0">Shipping</h6>
                                    <small className="text-muted">Brief description</small>
                                </div>
                                <span className="text-muted">${ shippingPrice }</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between">
                                <span>Total (USD)</span>
                                <strong>${ shippingPrice + modelPrice }</strong>
                            </li>
                        </ul>

                        <button className="btn btn-primary btn-lg btn-block" type="submit">Buy Now</button>
                    </div>
                    <div className="col-md-8 order-md-1">
                        <h4 className="mb-3">Shipping address</h4>
                        <form className="needs-validation" noValidate>
                            <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="firstName">First name</label>
                                <input type="text" className="form-control" id="firstName" placeholder="First"  required />
                                <div className="invalid-feedback">
                                    Valid first name is required.
                                </div>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="lastName">Last name</label>
                                <input type="text" className="form-control" id="lastName" placeholder="Last"  required />
                                <div className="invalid-feedback">
                                    Valid last name is required.
                                </div>
                            </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="address">Address</label>
                                <input type="text" className="form-control" id="address" placeholder="1234 Main St" required />
                                <div className="invalid-feedback">
                                    Please enter your shipping address.
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-5 mb-3">
                                    <label htmlFor="country">Country</label>
                                    <select className="custom-select d-block w-100" id="country" required>
                                    <option value>Choose...</option>
                                    <option>United States</option>
                                    </select>
                                    <div className="invalid-feedback">
                                        Please select a valid country.
                                    </div>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="state">State</label>
                                    <select className="custom-select d-block w-100" id="state" required>
                                    <option value>Choose...</option>
                                    {stateCodes.map((state, y) => <option>{state}</option>)}
                                    </select>
                                    <div className="invalid-feedback">
                                        Please provide a valid state.
                                    </div>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <label htmlFor="zip">Zip</label>
                                    <input type="text" className="form-control" id="zip" placeholder required />
                                    <div className="invalid-feedback">
                                        Zip code required.
                                    </div>
                                </div>
                            </div>
                            <h4 className="mb-3">Payment</h4>
                            <CreditCard />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Payment
