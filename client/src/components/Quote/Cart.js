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
            ourPrice: ""
        };
        this.getData()
        this.getCartItem()
        this.getCartID()
        this.getCartCheckout()
    }

    getData = () =>
    {
        axios.get("/api/getPrice")
        .then((data) =>
        {
            console.log('data from getPrice', data.data)
            this.setState({ modelID: data.data.modelID,
                            materialID: data.data.materialID,
                            materialName: data.data.materialName,
                            finishID: data.data.finishID,
                            finishingName: data.data.finishingName,
                            totalPrice: data.data.totalPrice,
                            scale: data.data.scale              })
        })
        .catch(err => console.log('error', err.data))
    }

    getCartItem = () =>
    {
        axios.get("/api/getCartItem")
        .then((data) =>
        {
            cartItem = data.data
            console.log('data from getCartItem', cartItem)
        })
        .catch(err => console.log('error', err.data))
    }

    getCartID = () =>
    {
        axios.get("/api/getCartID")
        .then((data) =>
        {
            cartID = data.data
            console.log('data from getCartID', cartID)
        })
        .catch(err => console.log('error', err.data))
    }

    getCartCheckout = () =>
    {
        axios.get("/api/checkout")
        .then((data) =>
        {
            checkout = data.data
            console.log('data from checkout', checkout)
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
