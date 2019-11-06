import React from 'react';
import { Link } from 'react-router-dom';
import Quote from "./Quote"


class Material extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            finish: '',
            material: '',
            materialsList: ['', 'Lime', 'Mango'],
            finishList: ['', 'Apple', 'Pear']
        };
        this.handleChangeMaterial = this.handleChangeMaterial.bind(this);
        this.handleChangeFinish = this.handleChangeFinish.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    //Goto localhost:3000/Home/api/materials, it returns the array of materials and finishes

    handleChangeMaterial(event) {
        this.setState({material: event.target.value})
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
