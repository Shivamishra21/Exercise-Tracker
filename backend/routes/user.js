const route = require("express").Router();
const express = require('express')
const app = express()
app.use(express.json())

const User = require("../model/user");

route.get ('/',(req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => {
      res.status(400).json("Error: " + err)
      console.log(err);
    });
});

route.post('/add',(req,res)=>{
    const username = req.body.username;
    const data = {username:username}
    User.create(data,(err,doc)=>{
        if(err){
            console.log("Error in adding User:-  ",err)
        }
        else{
            console.log(doc)
            res.send("User added!")
        }
    })

})

module.exports = route
