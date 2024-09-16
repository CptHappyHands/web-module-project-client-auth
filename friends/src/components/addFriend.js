import React from "react";
import axios from "axios";
import axiosWithAuth from "./utils/axiosWithAuth";

class NewFriend extends React.Component {
  state = {
    id: "",
    name: "",
    age: "",
    email: "",
  };

  handleChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  };

  addFriend = (friend) => {
    axiosWithAuth()
      .post("/friends", friend)
      .then((res) => {
        this.setState({
          ...this.state,
          friends: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.addFriend}>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <input
            type="number"
            name="age"
            value={this.state.age}
            onChange={this.handleChange}
          />
          <input
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <button>Add Friend</button>
        </form>
      </div>
    );
  }
}

export default NewFriend;
