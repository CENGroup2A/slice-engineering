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
        this.getData()
    }

    getData = () =>
    {
        axios.get("/api/getPrice")
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
                <p>Total Price: {this.state.totalPrice}</p>
                <p>Material Name: {this.state.materialName}</p>
                <button><Link to="/mat">Go Back</Link></button>
            </div>
		);
	}
}

export default Cart;
