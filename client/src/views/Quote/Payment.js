import React from 'react'
import CreditCard from '../../components/Stripe/CreditCard'
import axios from 'axios'
import { ErrorMessage, Formik } from 'formik'
import * as Yup from 'yup';

const stateCodes = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY",	"NC", "ND", "OH", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"]

const PaymentSchema = Yup.object().shape({
    firstname: Yup.string()
      .required('Required'),
    lastname: Yup.string()
      .required('Required'),
    city: Yup.string()
      .required('Required'),
    country: Yup.string()
      .required('Required'),
    state: Yup.string()
      .required('Required'),
    zipcode: Yup.string()
      .required('Required'),
    address: Yup.string()
      .required('Required'),
  });

class Payment extends React.Component
{
    state = 
    {
        shippingPrice : 0,
        modelPrice : 0,
        token : ""
    }

    constructor(props)
    {
        super(props)
        var locationState = this.props.location.state
        if (locationState)
        {
            this.state = {
                shippingPrice : 0,
                modelPrice    : locationState.modelPrice,
                token         : locationState.token
            }
        }
    }

    getCart = () =>
    {

    }

    updateShipment = () =>
    {

    }

    render()
    {
        var {shippingPrice, modelPrice} = this.state

        return (
            <Formik
                initialValues={{
                    firstname : '',
                    lastname : '',
                    address : '',
                    city : '',
                    zipcode : '',
                    country : '',
                    state : ''
                }}
                validationSchema={PaymentSchema}
                onSubmit={(values, actions) =>
                {
                    // axios.post("/api/submit-cart", 
                    // {
                    //     "token" : this.state.token,
                    //     "firstname" : values.firstname,
                    //     "lastname" : values.firstname,
                    //     "address"  : values.firstname,
                    //     "country" : this.state.country
                    // }) 
                    console.log(values)              
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
            <div className="container">
                <div className="row mt-4">
                    <div className="col-md-4 order-md-2 mb-4">
                        <h4 className="d-flex justify-content-between align-items-center mb-3">
                            <span className="text-muted">Your cart</span>
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
                    </div>
                    <div className="col-md-8 order-md-1">
                        <h4 className="mb-3">Shipping address</h4>
                        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                            <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="firstName">First name</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    id="firstname"
                                    placeholder="First"
                                    onChange={handleChange}
                                    value={values.firstname}
                                />
                                <ErrorMessage name="firstname" />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="lastName">Last name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="lastname"
                                    placeholder="Last"
                                    onChange={handleChange}
                                    value={values.lastname}
                                />
                                <ErrorMessage name="lastname" />
                            </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="address">Address</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="address"
                                    placeholder="1234 Main St"
                                    onChange={handleChange}
                                    value={values.address}
                                />
                                <ErrorMessage name="address" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="address">City</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="city"
                                    placeholder="City"
                                    onChange={handleChange}
                                    value={values.city}
                                />
                                <ErrorMessage name="city" />
                            </div>
                            <div className="row">
                                <div className="col-md-5 mb-3">
                                    <label htmlFor="country">Country</label>
                                    <select
                                        className="custom-select d-block w-100"
                                        id="country"
                                        onChange={handleChange}
                                        value={values.country}>
                                    <option value>Choose...</option>
                                    <option>United States</option>
                                    </select>
                                    <ErrorMessage name="country" />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="state">State</label>
                                    <select
                                        className="custom-select d-block w-100"
                                        id="state"
                                        onChange={handleChange}
                                        value={values.state}>
                                    <option value>Choose...</option>
                                    {stateCodes.map((state, y) => <option>{state}</option>)}
                                    </select>
                                    <ErrorMessage name="state" />
                                </div>
                                <div className="col-md-3 mb-3">
                                    <label htmlFor="zip">Zip</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="zipcode"
                                        placeholder="zip code"
                                        onChange={handleChange}
                                        value={values.zipcode}
                                        />
                                    <ErrorMessage name="zipcode" />
                                </div>
                            </div>
                            <h4 className="mb-3">Payment</h4>
                            <CreditCard />
                            <button className="btn btn-primary btn-lg btn-block" type="submit">Buy Now</button>
                        </form>
                    </div>
                </div>
            </div>)}
        </Formik>
        )
    }
}

export default Payment
