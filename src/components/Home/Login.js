import React, { Component } from "react";
import { Link, Route, BrowserRouter as Router, Switch, useHistory } from "react-router-dom";
import "./homeStyle.css";
import Signup from "./signup";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
function Home(props) {



const[username,setUsername] = useState('')
const[password,setPassword] = useState('')

 const onChangeUsername=(e)=> {
    setUsername(e.target.value,
    );
  }
 const onChangePassword=(e) =>{
    setPassword(e.target.value)
    
   
  }

  const onSubmit=(e) =>{
    e.preventDefault();
    const userInfo = {
      username: username,
      password: password,
    };
    axios
      .post("/users/login", userInfo)
      .then((res) => {
        console.log(res);
        console.log("Found the data");

        localStorage.setItem("jwt", res.data.user.token);
        localStorage.setItem("username", res.data.user.username);
        window.location = "/list";
      })
      .catch((err) => console.log("error=> ", err));

    setPassword('')
    setUsername('')
  }

  
    return (
      <div className="login-form">
        <form onSubmit={onSubmit}>
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
            <input type="submit" value="Login" className="btn  button" />
          </div>
          <div>
            Don't have account <Link to="/">Signup</Link>
          </div>
        </form>
      </div>
    );
  }


export default Home;
