import React from 'react';
import { Link } from 'react-router-dom';
import { throws } from 'should';
import ReactDOM from 'react-dom';
import 'rc-slider/assets/index.css';

var axios = require('axios')

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
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //Ideally this is activated on the page loading
    handleSubmit(event) {
        event.preventDefault();
        axios.get("/api/cartData")
        .then((data) =>
        {
            console.log('data', data.data)
            this.setState({ modelID: data.data.modelID,
                            materialID: data.data.materialID,
                            materialName: data.data.materialName,
                            finishID: data.data.finishID,
                            finishingName: data.data.finishingName,
                            totalPrice: data.data.totalPrice,
                            scale: data.data.scale})
        })
        .catch(err => console.log('error', err.data))
    }

	render() {
		return (
			<div>
                <p>     Total Price: {this.state.totalPrice}</p>
                <form onSubmit={this.handleSubmit}>
                    <input type="submit" value="Get Info" />
                </form>
            </div>
		);
	}
}

export default Cart;
