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
            daysInTransit: ""
        };
        this.getData()
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
                            daysInTransit: data.data.shipmentCost.services[0].daysInTransit})

            console.log('Shipment Data', this.state.shippingPrice, this.state.shippingType, this.state.daysInTransit)
            axios.post("/api/sendCartData", {modelID: this.state.modelID, materialID: this.state.materialID, materialName: this.state.materialName,
                finishID: this.state.finishID, finishingName: this.state.finishingName, totalPrice: this.state.totalPrice, scale: this.state.scale,
                shippingPrice: this.state.shippingPrice, shippingType: this.state.shippingType, daysInTransit: this.state.daysInTransit})
                .then(console.log('Data sent to sendCartData'))

            axios.get("/api/getCartItem")
            .then((data) =>
            {
                cartItem = data.data
                console.log('data from getCartItem', cartItem)
            })
            .catch(err => console.log('error', err.data))
        })
        .catch(err => console.log('error', err.data))
    }

	render() {
		return (
			<div>
                <p>Total Price: {this.state.totalPrice}</p>
                <button><Link to="/mat">Go Back</Link></button>
            </div>
		);
	}
}

export default Cart;
