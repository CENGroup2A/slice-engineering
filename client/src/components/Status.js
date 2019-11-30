import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
const axios = require('axios');

class Status extends Component {
    constructor(props) {
        super(props);
        //axios.post("http://localhost:5000/api/getS3");
    }
    render() { //---------------------- look here: https://getbootstrap.com/docs/3.3/components/ ----------------- cool stuff :) -------------
        return ( //-----also if u wanna use the components u need to import them ---- like the button on the top of this file
            <div>
                <p>TO DO FOR MADISON: UI FOR ORDER STATUS</p>
            </div>
        );
    }
}

export default Status;
