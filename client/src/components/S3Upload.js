const axios = require('axios');

module.exports.upload = (file) => {
  //console.log(file)
  axios.post("http://localhost:5000/api/upload", {
      filename: file.name,
      filetype: file.type
  })
  .then(function (result) {
      console.log(result)
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
      console.log(err);
      //this.changeUploadStatus()
      //this.props.changeUploadStatus(false)
  });
}
