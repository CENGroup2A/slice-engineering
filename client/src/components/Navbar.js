import React from 'react';
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import axios from "axios"
import {
    Link
  } from "react-router-dom";

class NavBar extends React.Component
{
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

    render()
    {
        var page = this
        if (this.state.auth == false)
        {
            return (
                <Navbar bg="light" expand="lg">
                        <Navbar.Brand href="/">Slice Engineering</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link href="/">Home</Nav.Link>
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
                                <Nav.Link href="/">Home</Nav.Link>
                                <Nav.Link href="/protected">Protected</Nav.Link>
                                <Nav.Link href="/profile">Profile</Nav.Link>
                            </Nav>
                            
                            <Button onClick={(event) =>
                            {
                                axios.post("/api/logout")
                                localStorage.removeItem('user_id')
                                window.location.reload();
                            }} variant="outline-success">Log Out</Button>
                        </Navbar.Collapse>
                    </Navbar>
            )
        }
    }
}

export default NavBar
