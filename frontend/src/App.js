import React from "react";
import "./App.css";
import SignInOutContainer from "./containers";
import Forgot from './components/Forgot';
import ResetPassword from './components/ResetPass';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from './components/Navbar/Navbar'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/login" component={SignInOutContainer} />
          <Route exact path="/home" component={() => <Home />} />
          <Route exact path="/forgot" component={() => <Forgot />} />
          <Route exact path="/reset" component={() => <ResetPassword />} />
          
        </Switch>
      </Router>
      <Navbar/>
    </div>
  );
}

export default App;
