import React, { Component } from "react";
import axios from "axios";

class SignUp extends Component {
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

  onSubmit = async e => {
    e.preventDefault();
    const user = this.state;

    await axios.post("http://localhost:3300/api/register", user);
    this.props.history.push("/login");
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
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
        <input type="button" value="Sign up" />
      </form>
    );
  }
}

export default SignUp;
