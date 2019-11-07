import React from 'react';
//import DragAndDrop from './DragAndDrop.js'
import axios from 'axios';

class S3Upload extends React.Component {

    handleChange = (ev) => {
        this.setState({success: false, url : ""});
    }

    upload = (ev) => {
        var file = this.uploadInput.files[0];
        axios.post("http://localhost:5000/api/upload", {
            filename: file.name,
            filetype: file.type
        })
        .then(function (result) {
            //console.log(result.data.data)
            var signedUrl = result.data.data;
            console.log(signedUrl.data)
            var options = {
                headers: {
                'Content-Type': file.type
                }
            };
        
            return axios.put(signedUrl.data, file, options);
        })
        .then(function (result) {
            console.log(result);
        })
        .catch(function (err) {
            console.log(err);
        });
    }

    addFile(name) {
        this.props.addFile(name)
    }

    render() {
        return (
            <div className="App">
                <center>
                    <h1>UPLOAD A FILE</h1>
                    <input onChange={this.handleChange} ref={(ref) => { this.uploadInput = ref; }} type="file"/>
                    <br/>
                    <button onClick={this.upload}>UPLOAD</button>
                </center>
            </div>
        )
    }
}
export default S3Upload;
