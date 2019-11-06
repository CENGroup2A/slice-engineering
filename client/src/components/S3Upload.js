import React from 'react';
import DragAndDrop from './DragAndDrop.js'
import axios from 'axios';

class S3Upload extends React.Component {

    // Perform the upload
    handleUpload = (ev) => {
        let file = this.uploadInput.files[0];
        // Split the filename to get the name and type
        let fileParts = this.uploadInput.files[0].name.split('.');
        let fileName = fileParts[0];
        let fileType = fileParts[1];
        console.log("Preparing the upload");
        
        axios.post("http://localhost:5000/api/upload",{
            fileName : fileName,
            fileType : fileType
        })
        .then(response => {
            var returnData = response.data.data.returnData;
            var signedRequest = returnData.signedRequest;
            var url = returnData.url;
            this.setState({url: url})
            console.log("Recieved a signed request " + signedRequest);
            
            // Put the fileType in the headers for the upload
            var options = {
                headers: {
                'Content-Type': fileType
                }
            };
            axios.put(signedRequest,file,options)
            .then(result => {
                console.log("Response from s3")
                this.setState({success: true});
            })
            .catch(error => {
                alert("ERROR " + JSON.stringify(error));
            })
        })
        .catch(error => {
        alert(JSON.stringify(error));
        })
    }

    handleDrop = (files) => {
        for (var i = 0; i < files.length; i++) {
          if (!files[i].name) return
          //this.state.files.push(files[i].name)
          this.addFile(files[i].name)
        }
        //this.setState({files: fileList})
      }

    addFile(name) {
        this.props.addFile(name)
    }

    render() {
        return (
            <div>
                <h1>Upload a file</h1>

                <input onChange={this.handleChange} ref={(ref) => { this.uploadInput = ref; }} type="file"/>
                <br/>
                <button onClick={this.handleUpload}>UPLOAD</button>
                <h1>Drag and Drop</h1>
                <DragAndDrop handleDrop={this.handleDrop}>
                    <div style={{height: 300, width: 250}}>
                        <p>Hey</p>
                        <p>Sup</p>
                    </div>
                </DragAndDrop>
            </div>
        )
    }
}
export default S3Upload;
