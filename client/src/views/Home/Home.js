import React from 'react';
import axios from "axios"
import Button from "react-bootstrap/Button";
import {Redirect, Link} from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import style from "./Home.css"


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
          <div id="ui-home-welcome-box">
              <ul>
                  <li>
                      <p id="ui-home-title">
                          Thank you for visiting the Slice Engineering 3D Printing Service Portal.
                      </p>
                  </li>
                  <li>
                      <p id="ui-home-text">
                          <br/>
                          We have a variety of printing methods, materials, and finishes available to choose from.
                          <br/>
                          Receive a real time quote by simply uploading your CAD file, selecting the desired 3D printing method,
                          <br/>
                          material, surface finish, and inputting a shipping address.
                      </p>
                      <p id="ui-home-button">
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
