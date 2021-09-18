import React from "react";
import "./App.css";
import SignInOutContainer from "./containers";
//import Login from './components/login';
//import Signup from './components/Signup';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/login" component={SignInOutContainer} />
          <Route exact path="/" component={() => <Home />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
