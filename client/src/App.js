import React from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import Home from "./views/Home/Home"
import NotFound from "./views/NotFound"
import Header from "./components/Header/Header"
import Material from "./components/Quote/Material"
import MaterialView from "./views/MaterialView"
import CartView from './views/CartView';




const App = () => {

    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/Home" component={Home} />
          <Route exact path="/mat" component={MaterialView} />
          <Route exact path="/cart" component={CartView} />
          <Route exact path="/">
            <Redirect to="/Home" />
          </Route>
          <Route component={NotFound}/>
        </Switch>
      </div>
    );
}

export default App;
