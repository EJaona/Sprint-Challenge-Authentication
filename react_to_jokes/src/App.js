import React, { Component } from "react";
import { NavLink, Route } from "react-router-dom";
import SignUp from "./SignUp";
import Login from "./Login";
import Jokes from "./Jokes";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <nav>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/sign_up">Sign up</NavLink>
        </nav>
        <main>
          <Route path="/sign_up" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/jokes" component={Jokes} />
        </main>
      </div>
    );
  }
}

export default App;
