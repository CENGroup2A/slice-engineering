import React from 'react';
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import axios from "axios"
import {
    Link
  } from "react-router-dom";

import AuthContext from '../context/AuthContext'

class NavBar extends React.Component
{
    static contextType = AuthContext;
    render()
    {      
        var page = this
        if (this.context.auth == false)
        {
            return (
                <Navbar bg="light" expand="lg">
                        <Navbar.Brand href="/">Slice Engineering</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                               <Nav.Link>Home</Nav.Link>
                            </Nav>
                            <Link to="/login"><Button variant="outline-success">Login</Button></Link>
                            <Link to="/sign-up"><Button className="ml-3" variant="outline-success">Signup</Button></Link>
                        </Navbar.Collapse>
                    </Navbar>
            )
        }

        else
        {
            return (
                
                <Navbar bg="light" expand="lg">
                        <Navbar.Brand href="#home">Slice Engineering</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link>Home</Nav.Link>
                                <Nav.Link>Protected</Nav.Link>
                            </Nav>
                            
                            <Button onClick={(event) =>
                            {
                                axios.post("/api/logout")
                                page.context.reloadAuth()
                            }} variant="outline-success">Log Out</Button>
                        </Navbar.Collapse>
                    </Navbar>
            )
        }
    }
}

export default NavBar
