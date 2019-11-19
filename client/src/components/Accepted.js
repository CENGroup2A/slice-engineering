import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Button from 'react-bootstrap/Button';

class Accepted extends Component {
    constructor(props) {
        super(props);

        this.state = {
            file: this.props.location.state.file, //<-------------------------file!!! :)
            link: null
        };
    }

    routeChange = () => {
        this.setState({link: '/status'});
    }

    render() {
        const {link} = this.state;
        if (link) {
            return <Redirect to={link} />;
        }
        
        return (
            <div>
                <p>TO DO FOR CARLOS: SEND FILE TO USE IN UPLOAD COMPONENT</p>
                <div>FILE: {JSON.stringify(this.state.file.name)}</div>
                <Button id="ui-submit" type="submit" onClick={this.routeChange}>Check Status</Button>
            </div>
        );
    }
}

export default Accepted;
