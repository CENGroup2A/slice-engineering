import React from 'react';
import axios from 'axios';

class S3Upload extends React.Component {

    upload = (ev) => {
        var file = this.uploadInput.files[0]
        this.props.changeFile(file)
        axios.post("http://localhost:5000/api/upload", {
            filename: file.name,
            filetype: file.type
        })
        .then(function (result) {
            var signedUrl = result.data.data;
            var options = {
                headers: {
                'Content-Type': file.type
                }
            };
        
            return axios.put(signedUrl.data, file, options)
        })
        .then(function (result) {
            if(result.statusText === "OK") {
                console.log('File uploaded')
                //this.props.changeFile(file)
                //this.props.changeUploadStatus(true)
            }
        })
        .catch(function (err) {
            //this.changeUploadStatus()
            //this.props.changeUploadStatus(false)
        });
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
