import React from 'react';
import axios from "axios"
import Button from "react-bootstrap/Button";
import {Redirect, Link} from "react-router-dom";
import Nav from "react-bootstrap/Nav";


class Home extends React.Component {
    state =
    {
        auth : false
    }

    constructor(props)
    {
        super(props)
        var page = this
        axios.get("/api/auth")
        .then((response) =>
        {
            this.setState({auth: response.data.auth})
        })
    }

    redirect(){
        if (this.state.auth == false) return "/login"
        else return "/protected"
    }

    render(){
      return (
          <div style={{ height: "75vh", width: "100%", display: "flex", justifyContent: 'center', alignItems: 'center', backgroundColor : "#FFFFFF"}}>
              <ul>
                  <li>
                      <p align="center" style={{fontSize: "35px"}}>
                          Thank you for visiting the Slice Engineering 3D Printing Service Portal.
                      </p>
                  </li>
                  <li>
                      <p align="center" style={{fontSize: "18px"}}>
                          <br/>
                          We have a variety of printing methods, materials, and finishes available to choose from.
                          <br/>
                          Receive a real time quote by simply uploading your CAD file, selecting the desired 3D printing method,
                          <br/>
                          material, surface finish, and inputting a shipping address.
                          <br/>
                          All quotes include shipping.
                      </p>
                      <p align="center">
                          <Button variant="primary" type="customizeYourPrint" href={this.redirect()}>
                              Customize Your Print
                          </Button>
                      </p>
                  </li>
              </ul>
          </div>
      );
    }
} export default Home;
