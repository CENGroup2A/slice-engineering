import React from 'react';
import { Link } from 'react-router-dom';

class Material extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            service: '',
            material: '',
            materialsList: ['', 'Lime', 'Mango'],
            serviceList: ['', 'Apple', 'Pear']
        };
        
        this.handleChangeMaterial = this.handleChangeMaterial.bind(this);
        this.handleChangeService = this.handleChangeService.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChangeMaterial(event) {
        this.setState({material: event.target.value})
    }

    handleChangeService(event) {
        this.setState({service: event.target.value})
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.serviceUpdate(this.state.service, this.state.material)
    }

	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
                    <label>
                        Type of Printing Service: 
                        <select onChange={this.handleChangeService}>
                            {this.state.serviceList.map((x,y) => <option key={y}>{x}</option>)}
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
