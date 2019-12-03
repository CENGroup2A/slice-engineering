import React from 'react';
import styles from './NotFound.css';
import Button from 'react-bootstrap/Button';

const NotFound = () => {
        return(
        <div>
            <div>
                <p id="page404-code" >
                    Sorry.
                    <div id="page404-text">
                        We can't seem to find the page you are looking for.
                    </div>
                </p>
            </div>
            <div>
                <p id="page404-button" >
                    <Button variant="success" onClick={(event) =>
                          {window.history.back();}}> Go Back
                    </Button>
                </p>
            </div>
        </div>
        )
}

export default NotFound;
