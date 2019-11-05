import React from 'react';
import { Link } from 'react-router-dom';

class Quote extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            service: this.props.service
        }
    }

	render() {
        return(
            <div>
            </div>
        );
    }
}

export default Quote;