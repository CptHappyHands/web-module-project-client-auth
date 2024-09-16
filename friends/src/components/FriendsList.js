import React from "react";
// import Loader from "react-loader-spinner";
import axiosWithAuth from "./utils/axiosWithAuth";
import NewFriend from "./addFriend";

class FriendsList extends React.Component {
  state = {
    friends: [],
  };

  componentDidMount() {
    this.getFriends();
  }

  getFriends = () => {
    axiosWithAuth()
      .get("/friends")
      .then((res) => {
        this.setState({
          friends: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
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

  formatFriends = () => {
    const formattedFriends = [];
    this.state.friends.forEach((age, index, arr) => {
      if (age.age >= 30) {
        formattedFriends.push({
          id: index,
          name: arr[index],
          age: age.age,
          email: arr[index].email,
        });
      }
      console.log(formattedFriends);
    });
    return formattedFriends;
  };

  render() {
    const friends = this.formatFriends();
    // console.log(friends);
    return (
      <div className="friends-list">
        <div className="title-wrapper">
          <div className="title">
            <div className="top-title">List of Friends</div>
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
          </div>

          {this.props.fetchingData && (
            <div className="key spinner">
              {/* <Loader type="Puff" color="#204963" height="60" width="60" /> */}
              <p>Loading Friends</p>
            </div>
          )}
          <div>
            {this.state.friends.map((friend) => {
              console.log(friend);
              return (
                <div key={friend.id}>
                  <h2>{friend.name}</h2>
                  <p>Age: {friend.age}</p>
                  <p>Email: {friend.email}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default FriendsList;
