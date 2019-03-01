import React, { Component } from "react";
import axios from "axios";

class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  inputChange = e => {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      [name]: value
    });
  };

  submit = async e => {
    e.preventDefault();
    const user = this.state;
    console.log("hit");
    const response = await axios.post("http://localhost:3300/api/login", user);
    localStorage.setItem("jwt", response.data.token);
    this.props.history.push("./jokes");
  };

  render() {
    return (
      <form onSubmit={this.submit}>
        <input
          type="text"
          name="username"
          value={this.state.username}
          placeholder="username"
          onChange={this.inputChange}
        />
        <input
          type="password"
          name="password"
          value={this.state.password}
          placeholder="password"
          onChange={this.inputChange}
        />
        <input type="submit" value="Login" />
      </form>
    );
  }
}

export default Login;
