const route = require("express").Router();
const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
app.use(express.json());

const User = require("../model/user");
const { Error } = require("mongoose");

const handleErrors = (err) => {
    console.log(err)
  let error = { username: "", password: "",email:"" };
  if(err.message === 'Incorrect Email/Username'){
    error.email = 'This email/username is not registered.'
  } 

  if(err.message === 'Incorrect Password'){
    error.password = 'Password incorrect.'
  }
  if (err.code === 11000) {
      if(err.keyValue.email){
        error.email = " This email is already registered."; 
      }
      else if(err.keyValue.username)
        error.username = " This username is already registered.";
    return error;
  }
  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      error[properties.path] = properties.message;
    });
  }
  return error;
};

const maxAge = 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

route.get("/", (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => {
      res.status(400).json("Error: " + err);
      console.log(err);
    });
});

route.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const data = { username, password,email};
  User.create(data)
    .then((user) => {
      const token = createToken(user._id);
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: maxAge * 1000,
      });
      res.status(201).json({ user: { id: user._id, username: user.username } });
    })
    .catch((err) => {
      console.log("Error in user adding :-", err.message);
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    });
});

route.post('/login',(req,res)=>{
    const {username,password} = req.body
    User.login(username,password)
    .then((user)=>{
        const token =  createToken(user._id);
        res.cookie('jwt',token,{
            httpOnly:true,
            maxAge:maxAge*1000
        })
        res.status(200).json({user:user.username})

    })
.catch((err)=>{
    const errors = handleErrors(err)
    res.status(400).json({errors})
})
})


module.exports = route;
