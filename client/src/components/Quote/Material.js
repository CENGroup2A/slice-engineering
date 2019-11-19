import React from 'react';
import { Link } from 'react-router-dom';
import Quote from "./Quote";
import { throws } from 'should';
var axios = require('axios')

var listOfMats = [];
var materialsArray = [];
var listOfFinishes = ['please choose a material'];
var materialz;
var materialzID;
var uploadedFile;
var finishID;
var finishes = [];


//materialz = event.target.value; value -> name string
//var materialChosen = this.state.mats.find(isMaterial);
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
            mats: [],
            price: ''
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
                materialsArray.push(element)
                listOfMats.push(element.name)
                console.log(element.name, element.materialID)
            });
            this.setState({ materialsList: listOfMats })
            this.setState({mats: mat.data})
        })
    }

    handleChangeMaterial(event) {
        var index = event.target.selectedIndex
        console.log('index', index)
        console.log('materialID', materialsArray[index].materialID)

        materialzID = materialsArray[index].materialID;
        
        listOfFinishes = [];
        this.setState({material: event.target.value})
        materialz = event.target.value;
        var materialChosen = this.state.mats.find(isMaterial);
        
        materialChosen.finishes.forEach(function(element){
            finishes.push(element)
            console.log('element', element)
            listOfFinishes.push(element.name);
        });
        this.setState({finishList: listOfFinishes, finish: this.state.finishList[0]})
        //this.setState({finish: this.state.finishList[0]})

        //Need to set the default finsih
    }

    handleChangeFinish(event) {
        var index = event.target.selectedIndex
        console.log('index', index)
        console.log('finishID', finishes[index].finishID)

        finishID = finishes[index].finishID;

        this.setState({finish: event.target.value})
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log('uploadedFile', uploadedFile)

        const reactData = {material: materialzID, finish: finishID}

        axios.post("/api/sendMat", reactData)
            .then(res => console.log('Data sent'))
            .then(() =>
            {
                return axios.get("/api/getPrice")
            })
            .then((price) =>
            {
                this.setState({price: price.data})
                console.log('price', this.state.price)
            })
            .catch(err => console.log('error', err.data))
    }

    onChangeHandler=event=>{
        uploadedFile = event.target.files[0];
    }

	render() {
		return (
			<div>
                <div>
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
                            <p>Price: </p> 
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
