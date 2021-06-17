import React, { Component } from "react";
import axios from "axios";
class Logout extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  onClick(e) {
    e.preventDefault();
    axios
      .get("/users/logout")
      .then((res) =>{ console.log(res);
      localStorage.clear()})
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div>
        Logout
        <button type="submit" onClick={this.onClick}>
          Logout
        </button>
      </div>
    );
  }
}

export default Logout;
