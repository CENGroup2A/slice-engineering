import React from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import Home from "./views/Home/Home"
import NotFound from "./views/NotFound"
import Header from "./components/Header/Header"
import Material from "./components/Quote/Material"


class App extends React.Component {

  constructor(props){
    super(props);
    this.state={
      serivce: '',
      material: ''
    };
  }

  serviceUpdate(service, material){
    this.setState({
      service: service,
      material: material
    })
    console.log('Service: ', this.state.service)
    console.log('Material: ', this.state.material)
  }

  render(){
    return (
      <div>
        <Header />
        <Material
          serviceUpdate={this.serviceUpdate.bind(this)}
        />
        <Switch>
          <Route exact path="/Home" component={Home} />
          <Route exact path="/">
            <Redirect to="/Home" />
          </Route>
          <Route component={NotFound}/>
        </Switch>
      </div>
    );
  }
}

export default App;
