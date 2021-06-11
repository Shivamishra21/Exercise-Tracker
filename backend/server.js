//Requiring Modules
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const exerciseRoute = require('./routes/exercise')
const usersRoute = require('./routes/user')

//Initised express
const app = express();

//Middleware
app.use(express.json());
app.use(cors());


//port
const port = process.env.PORT || 5000;

const uri =
  "mongodb+srv://Shiva:getlost@cluster0.tdrow.mongodb.net/Cluster0?retryWrites=true&w=majority";

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then((result) =>{})
  .catch((err) => console.log(err));


app.get("/", (req, res) => {
  res.send("home")
});


app.use('/exercise',exerciseRoute)
app.use('/users',usersRoute)

//Running Server
app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
