import React from 'react';
import { Link } from 'react-router-dom';
import { throws } from 'should';
import ReactDOM from 'react-dom';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

var axios = require('axios')


//Variables that are sent to Price.server.controller
var uploadedFile;
var materialzID = "035f4772-da8a-400b-8be4-2dd344b28ddb";
var finishID = "bba2bebb-8895-4049-aeb0-ab651cee2597";
var city = ""
var zipcode = ""
var currency = "USD"
var finishes = [];

//Variables needed for parsing, searching, different things like that
var materialObjects = [];
var finishesObjects = [];
var finishNames = ['please choose a material'];
var materialz = "Polyamide (SLS)";
var countryCodes = ["US"];
var stateCodes = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY",	"NC", "ND", "OH", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"]


//Function needed for finding material name
function isMaterial(materialPassedIn) {
    return materialPassedIn.name === materialz;
}

class Material extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            //Two lists needed for drop down menus
            materialsList: [''],
            finishList: ["Natural white","Polished natural white","Dyed yellow","Satin Yellow","Polished and Dyed Yellow","Dyed orange","Satin Orange","Polished and Dyed Orange","Dyed red","Satin Red","Polished and Dyed Red","Satin Green","Polished and Dyed Green","Dyed blue","Satin Blue","Polished and Dyed Blue","Dyed purple","Satin Purple","Polished and Dyed Purple","Dyed black","Satin black","Polished and Dyed Black","Dyed bordeaux","Satin Bordeaux","Polished and Dyed Bordeaux","Dyed petrol blue","Satin Petrol Blue","Polished and Dyed Petrol blue","Dyed brown","Satin Brown","Polished and Dyed Brown","Velvet yellow","Velvet ochre","Velvet pink","Velvet bordeaux","Velvet green","Velvet petrol blue","Velvet blue","Velvet black","Spray painted white","Spray painted black","Waterproof white","Dyed green","Dyed grey"],
            mats: [],
            price: '',
            scale: '1',
            //Needed to send to Price.server.controller
            countryCode: 'US',
            stateCode: 'AL',
            modelID: ''
        };

        //Functions needed
        this.handleChangeMaterial = this.handleChangeMaterial.bind(this);
        this.handleChangeFinish = this.handleChangeFinish.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeFileUpload = this.onChangeFileUpload.bind(this)
        this.handleChangeState = this.handleChangeState.bind(this)
        this.handleChangeCountry = this.handleChangeCountry.bind(this)
        this.handleChangeCity = this.handleChangeCity.bind(this)
        this.handleChangeZipcode = this.handleChangeZipcode.bind(this)
        this.handleChangeScale = this.handleChangeScale.bind(this)
        this.getMats()
        this.handleChangeNext = this.handleChangeNext.bind(this)
    }

    //Gets the materials and finishes from the API
    getMats = () =>
    {
        axios.get("/api/mat")
        .then((mat) =>
        {
            var matNames = [];
            mat.data.forEach(function(element){
                materialObjects.push(element)
                matNames.push(element.name)
            });
            this.setState({ materialsList: matNames })
            this.setState({mats: mat.data})
        })
    }

    handleChangeNext(value){
        console.log('Sending')
        
        //Maybe need to send?
        //countryCode: this.state.countryCode, stateCode: this.state.stateCode, city: city, zipcode: zipcode, currency: currency
    }

    //Changes the finishes based on the material chosen
    handleChangeMaterial(event) {
        materialzID = materialObjects[event.target.selectedIndex].materialID;
        finishesObjects = materialObjects[event.target.selectedIndex].finishes

        finishNames = [];
        materialz = event.target.value;
        var materialChosen = this.state.mats.find(isMaterial);
        console.log(materialChosen)

        materialChosen.finishes.forEach(function(element){
            finishes.push(element)
            finishNames.push(element.name);
        });

        this.setState({finishList: finishNames, finish: this.state.finishList[0]})
        finishID = finishesObjects[0].finishID
    }

    handleChangeFinish(event) {
        finishID = finishes[event.target.selectedIndex].finishID;
        this.setState({finish: event.target.value})
    }

    handleChangeState(event) {
        this.setState({stateCode: stateCodes[event.target.selectedIndex]})
    }

    handleChangeCountry(event) {
        this.setState({countryCode: countryCodes[event.target.selectedIndex]})
    }

    handleChangeCity(event) {
        city = event.target.value
    }

    handleChangeZipcode(event) {
        zipcode = event.target.value
    }

    onChangeFileUpload=event=>{
        uploadedFile = event.target.files[0];
    }

    handleSubmit(event) {
        event.preventDefault();

        const reactData = {material: materialzID, finish: finishID, countryCode: this.state.countryCode, stateCode: this.state.stateCode, city: city, zipcode: zipcode, currency: currency, scale: this.state.scale}

        //Send the information to Price.server.controller
        axios.post("/api/sendMat", reactData)
            .then(res => console.log('Data sent'))
            .then(() =>
            {
                return axios.get("/api/getPrice")
            })
            .then((price) => //Get the price back from Price.server.controller
            {
                console.log(price.data.totalPrice);
                console.log('price.data', price.data)
                this.setState({price: price.data.totalPrice})
                this.setState({modelID: price.data.modelID})
            })
            .catch(err => console.log('error', err.data))
    }

    handleChangeScale(event){
        this.state.scale = event/100
    }

	render() {
		return (
			<div>
                <p>Scale: </p>
                <div>
                    <Slider min={20} defaultValue={100} marks={{ 20: 20, 50: 50, 70: 70, 100: 100 }} step={null} onAfterChange={this.handleChangeScale}/>
                    <p></p>
                </div>
                
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

                            <p>Country: </p>
                            <select onChange={this.handleChangeCountry}>
                                {countryCodes.map((x,y) => <option key={y}>{x}</option>)}
                            </select>

                            <p>State: </p>
                            <select onChange={this.handleChangeState}>
                                {stateCodes.map((x,y) => <option key={y}>{x}</option>)}
                            </select>

                            <p>City: </p>
                            <input type="text" name="city" onChange={this.handleChangeCity}/>

                            <p>Zipcode: </p>
                            <input type="text" name="Zipcode" onChange={this.handleChangeZipcode}/>

                            <p>Currency: </p>
                            <select onChange={this.handleChangeCurrency}>
                                <option>USD</option>
                            </select>

                            <p></p>
                            
                            <p>Total Price: {this.state.price} </p>
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
                <div>
                    <input type="file" name="file" onChange={this.onChangeFileUpload}/>

                    <button onClick={this.handleChangeNext}>Continue</button>
                </div>
			</div>
		);
	}
}

export default Material;
