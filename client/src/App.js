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
      filesToUpload: []
    };
  }

  addFile(fileName) {
    this.setState({
      filesToUpload: this.state.filesToUpload.concat(fileName)
    })
    console.log(this.state.filesToUpload);
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
  
        <S3Upload files={this.state.filesToUpload} addFile={this.addFile.bind(this)}/>
      </div>
    );
  }
}

export default App;
