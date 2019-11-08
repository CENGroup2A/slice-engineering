import React from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import Home from "./views/Home/Home"
import NotFound from "./views/NotFound"
import Header from "./components/Header/Header"
import S3Upload from "./components/S3Upload"

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cadFile: {},
      fileUploaded: false
    };
  }

  changeFile(file) {
    this.setState({
      cadFile: file
    })
  }

  changeUploadStatus(status) {
    this.setState({
      fileUploaded: status
    })
  }

  updateFiles

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/Home" component={Home} />
          <Route exact path="/">
            <Redirect to="/Home" />
          </Route>
          <Route component={NotFound}/>
        </Switch>
  
        <S3Upload 
          file={this.state.cadFile} 
          changeFile={this.changeFile.bind(this)} 
          changeUploadStatus={this.changeUploadStatus.bind(this)}
        />

      </div>
    );
  }
}

export default App;
