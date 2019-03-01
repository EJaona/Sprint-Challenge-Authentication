import React, { Component } from "react";
import axios from "axios";

class Jokes extends Component {
  state = {
    jokes: []
  };

  componentDidMount() {
    this.getJokes();
  }

  logout = e => {
    e.preventDefault();
    localStorage.clear();
    this.props.history.push("/login");
  };

  getJokes = async _ => {
    try {
      const jokeData = await axios.get("http://localhost:3300/api/jokes", {
        headers: { authorization: localStorage.getItem("jwt") }
      });
      this.setState({
        jokes: jokeData.data
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div>
        <input type="submit" value="logout" onClick={this.logout} />
        {this.state.jokes.map(joke => (
          <h3 key={joke.id}>{joke.joke}</h3>
        ))}
      </div>
    );
  }
}

export default Jokes;
