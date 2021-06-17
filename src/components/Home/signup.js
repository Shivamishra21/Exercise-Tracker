import React,  { useState,useEffect }from "react";
import axios from "axios";
import "./homeStyle.css";
import {useHistory} from 'react-router-dom'


function Signup(props) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");



  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userInfo = {
      username: username,
      password: password,
      email: email,
    };
    axios
      .post("/users/signup", userInfo)
      .then((res) => {
        console.log(res.data);
        window.location = "/list";
        localStorage.setItem("jwt", res.data.user.token);
      })
      .catch((err) => console.log("error=> ", err));

    setEmail("");
    setUsername("");
    setPassword("");
    window.location = "/list";
  };

  return (
    <div className="login-form signup">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Email: </label>
          <br />
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={onChangeEmail}
          />
        </div>
        <div className="form-group">
          <label>Username: </label>
          <br />
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={onChangeUsername}
          />
        </div>
        <div className="form-group">
          <label>Password: </label>
          <br />
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={onChangePassword}
          />
        </div>
        <div className="form-group">
          <input type="submit" value="Signup" className="btn  button" />
        </div>
      </form>
    </div>
  );
}

export default Signup;
