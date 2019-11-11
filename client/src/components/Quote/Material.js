import React from 'react';
import { Link } from 'react-router-dom';
import Quote from "./Quote";
import { throws } from 'should';
var axios = require('axios')

var listOfMats = [];
var listOfFinishes = [];


function isMaterial(material) { 
    return "ABS";
}


class Material extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            finish: '',
            material: '',
            materialsList: [''],
            finishList: [''],
            mats: []
        };
        this.handleChangeMaterial = this.handleChangeMaterial.bind(this);
        this.handleChangeFinish = this.handleChangeFinish.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getMats()
    }

    getMats = () =>
    {
        axios.get("/api/mat")
        .then((mat) =>
        {
            mat.data.forEach(function(element){
                listOfMats.push(element.name)
            });
            console.log(mat.data)
            this.setState({ materialsList: listOfMats })
            this.setState({mats: mat.data})
        })
    }

    handleChangeMaterial(event) {
        this.setState({material: event.target.value})
        var material = this.state.mats.find(isMaterial);
        material.finishes.forEach(function(element){
            listOfFinishes.push(element.name);
        });
        console.log(listOfFinishes)
    }

    handleChangeFinish(event) {
        this.setState({finish: event.target.value})
    }

    handleSubmit(event) {
        event.preventDefault();
    }

	render() {
		return (
			<div>
                <Quote material = {this.state.material} service = {this.state.finish}/>
				<form onSubmit={this.handleSubmit}>
                    <label>
                        Type of Printing Finish: 
                        <select onChange={this.handleChangeFinish}>
                            {this.state.finishList.map((x,y) => <option key={y}>{x}</option>)}
                        </select>
                        <p></p>
                        Material:
                        <select onChange={this.handleChangeMaterial}>
                            {this.state.materialsList.map((x,y) => <option key={y}>{x}</option>)}
                        </select>
                    </label>
                <input type="submit" value="Submit" />
            </form>
			</div>
		);
	}
}

export default Material;
