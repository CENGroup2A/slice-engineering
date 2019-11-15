import React from 'react';
import { Link } from 'react-router-dom';
import Quote from "./Quote";
import { throws } from 'should';
var axios = require('axios')

var listOfMats = [];
var listOfFinishes = ['please choose a material'];
var materialz;
var uploadedFile;

function isMaterial(materialPassedIn) { 
    return materialPassedIn.name === materialz;
}


class Material extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            finish: '',
            materialsList: [''],
            finishList: ['please choose a material'],
            mats: []
        };
        this.handleChangeMaterial = this.handleChangeMaterial.bind(this);
        this.handleChangeFinish = this.handleChangeFinish.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this)
        
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
            this.setState({ materialsList: listOfMats })
            this.setState({mats: mat.data})
        })
    }

    handleChangeMaterial(event) {
        listOfFinishes = [];
        this.setState({material: event.target.value})
        materialz = event.target.value;
        var materialChosen = this.state.mats.find(isMaterial);
        
        materialChosen.finishes.forEach(function(element){
            listOfFinishes.push(element.name);
        });
        this.setState({finishList: listOfFinishes, finish: this.state.finishList[0]})
        //this.setState({finish: this.state.finishList[0]})
    }

    handleChangeFinish(event) {
        this.setState({finish: event.target.value})
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log('uploadedFile', uploadedFile)

        const reactData = {uploadedFile: uploadedFile, material: materialz, finish: this.state.finish}

        axios.post("/api/price", reactData)
            .then(res => console.log('Data sent'))
            .catch(err => console.log('error', err.data))
    }

    onChangeHandler=event=>{
        uploadedFile = event.target.files[0];
    }

	render() {
		return (
			<div>
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
                <div>
                    <input type="file" name="file" onChange={this.onChangeHandler}/>
                </div>
			</div>
		);
	}
}

export default Material;
