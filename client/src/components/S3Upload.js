const axios = require('axios');

module.exports.upload = (file, callback) => {
  console.log("Uploading file")
  console.log(file)
  axios.post("/api/upload", {
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
      axios.put(signedUrl.data, file, options).then(function (result)
      {
        if(result.statusText === "OK") {
            console.log('File uploaded')

            axios.post("/api/getFileURL", {
                key: result.config.data.name
            }).then(function (URLResult) {
                callback(URLResult.data.url)
            })
        }
      })
      .catch(function (err) {
          console.log("Error uploading", err);
      })
  })
}
