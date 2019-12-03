import React from 'react';
import styles from './FAQ.css';
import Button from 'react-bootstrap/Button';

const NotFound = () => {
        return(
        <div>
            <p id="ui-title"> Frequently Asked Questions</p>
            <div id="ui-AboutTheProcess">
                <p id="ui-h2">3D Printing Made <span class="greenText">Simple</span>.</p>
                <p id="ui-p1"> When it comes down to it, we’re engineers. And when we encounter a problem, it’s compulsive
                               for us to find a solution, or design one. Unfortunately, it's often difficult to bring our
                               solutions to life. That's why we're here. We 3D print your parts for you so you can focus on
                               what matters. The process is <span class="orangeText">simple</span> and <span class="orangeText">intuitive</span>.
                </p>
                <p id="ui-bullet">
                    <img src="one.svg" alt="one bullet" height='50' width='50'/>
                    <span class="instruction">Upload Your Part.</span>
                </p>
                <p id="ui-bullet">
                    <img src="two.svg" alt="two bullet" height='50' width='50'/>
                    <span class="instruction">Accept Your Quote.</span>
                </p>
                <p id="ui-bullet">
                    <img src="three.svg" alt="three bullet" height='50' width='50'/>
                    <span class="instruction">Receive Your Custom Print.</span>
                </p>

                <p id="ui-faq">
                   Q: How long will it be before I receive my print? <br/>
                   A: Your print will arrive within 5-7 business days from the day your order is placed.
                </p>

                <p id="ui-faq">
                   Q: Will we get an A on this project submission? <br/>
                   A: Yes. Yes we will.
                </p>
            </div>
        </div>
        )
}

export default NotFound;
