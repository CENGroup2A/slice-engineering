import React from 'react';
import { Link } from 'react-router-dom';
import { throws } from 'should';
import ReactDOM from 'react-dom';

var axios = require('axios')
var cartItem
var cartID
var checkout

class Cart extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            modelID: "",
            materialID: "",
            materialName: "",
            finishID: "",
            finishingName: "",
            totalPrice: "",
            scale: "",
            ourPrice: "",
            shippingPrice: "",
            shippingType: "",
            daysInTransit: "",
            countryCode: "",
            stateCode: "",
            city: "",
            zipcode: "",
            currency: "",
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: ""
        };
        this.getData()
        this.handleChangeFirstName = this.handleChangeFirstName.bind(this)
        this.handleChangeLastName = this.handleChangeLastName.bind(this)
        this.handleChangeEmail = this.handleChangeEmail.bind(this)
        this.handleChangephoneNumber = this.handleChangephoneNumber.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeFirstName(event) {
        this.setState({firstName: event.target.value})
    }
    handleChangeLastName(event) {
        this.setState({lastName: event.target.value})
    }
    handleChangeEmail(event) {
        this.setState({email: event.target.value})
    }
    handleChangephoneNumber(event) {
        this.setState({phoneNumber: event.target.value})
    }

    handleSubmit(event) {
        event.preventDefault();
        axios.post("/api/sendCartData", {modelID: this.state.modelID, materialID: this.state.materialID, materialName: this.state.materialName,
            finishID: this.state.finishID, finishingName: this.state.finishingName, totalPrice: this.state.totalPrice, 
            scale: this.state.scale, shippingPrice: this.state.shippingPrice, shippingType: this.state.shippingType, 
            daysInTransit: this.state.daysInTransit, countryCode: this.state.countryCode, stateCode: this.state.stateCode,
            city: this.state.city, zipcode: this.state.zipcode, currency: this.state.currency, firstName: this.state.firstName, lastName: this.state.lastName,
            email: this.state.email, phoneNumber: this.state.phoneNumber})
        .then(console.log('Data sent to sendCartData'))

        axios.get("/api/getCartItem")
        .then((data) =>
        {
        cartItem = data.data
        console.log('data from getCartItem', cartItem)
        })
        .catch(err => console.log('error', err.data))
    }


    getData = () =>
    {
        axios.get("/api/getPrice")
        .then((data) =>
        {
            console.log('data from getPrice', data.data)
            this.setState({ modelID: data.data.models[0].modelID,
                            materialID: data.data.models[0].materialID,
                            materialName: data.data.models[0].materialName,
                            finishID: data.data.models[0].finishID,
                            finishingName: data.data.models[0].finishingName,
                            totalPrice: data.data.models[0].totalPrice,
                            scale: data.data.scale,
                            shippingPrice: data.data.shipmentCost.services[0].value,
                            shippingType: data.data.shipmentCost.services[0].name,
                            daysInTransit: data.data.shipmentCost.services[0].daysInTransit,
                            countryCode: data.data.countryCode,
                            stateCode: data.data.stateCode,
                            city: data.data.city,
                            zipcode: data.data.zipcode,
                            currency: data.data.currency})
        })
        .catch(err => console.log('error', err.data))
    }

	render() {
		return (
			<div>
                <p>Total Price: {this.state.totalPrice}</p>
                <button><Link to="/mat">Go Back</Link></button>
            <form onSubmit={this.handleSubmit}>
                    <label>
                        <p>First Name: </p>
                        <input type="text" name="First Name" onChange={this.handleChangeFirstName}/>
                        <p></p>
                        <p>Last Name: </p>
                        <input type="text" name="Last Name" onChange={this.handleChangeLastName}/>
                        <p></p>
                        <p>Phone Number: </p>
                        <input type="text" name="Phone Number" onChange={this.handleChangephoneNumber}/>
                        <p></p>
                        <p>Email: </p>
                        <input type="text" name="Email" onChange={this.handleChangeEmail}/>
                        <p></p>
                    </label>
                <input type="submit" value="Submit" />
                </form> 
            </div>
		);
	}
}

export default Cart;
