const express = require("express");
const Exercise = require("../model/exercise");

const app = express();
const route = express.Router();

app.use(express.json());

route.get("/update/:id", (req, res) => {
  // console.log(req.params)
  Exercise.findOne({_id:req.params.id})
    .then((exercise) => {
      if(exercise)
        res.status(200).json(exercise);
      else{
        res.send("Not found")
      }
    })
    .catch((err) => res.status(400).json("No record found!"));
});

route.post("/add", (req, res) => {
  console.log(req.body)
  const data = {
    username: req.body.username,
    description: req.body.description,
    duration: Number(req.body.duration),
    date:(req.body.date)
  };
  console.log(data)
  Exercise.create(data, (err, doc) => {
    if (err) {
      res.status(400).json(err);
    } else {
      console.log("Exercise Record: ", doc);
      res.send("Your exercise detail has been added!");
    }
  });
});


route.get("/:id", (req, res) => {
  Exercise.find({ username: req.params.id })
    .then((exercise) => {
        if(exercise)
      res.json(exercise);
      else{
          res.send("No exercise found :(")
      }
    })
    .catch((err) => res.status(400).json("No user found with this id."));
});


route.delete("/:id", (req, res) => {
  Exercise.findOneAndDelete({ _id: req.params.id })
    .then(() => {
      res.json("Exercise Deleted");
    })
    .catch((err) => {
      res.status(400).json("Error in deletion: ", err);
    });
});

route.post("/update/:id", (req, res) => {
  Exercise.findOne({ _id: req.params.id })
    .then((exercise) => {
      exercise.username = req.body.username || exercise.username;
      exercise.description = req.body.description || exercise.description;
      exercise.duration = req.body.duration || exercise.duration;
      exercise.date = (req.body.date) || exercise.date;

      exercise
        .save()
        .then((updatedExercise) => {
          res.json(updatedExercise);
        })
        .catch((err) =>
          res.status(400).json("Error in getting updated data : ", err)
        );
    })
    .catch((err) => {
      res.status(400).json("Error in Updation : ", err);
    });
});

module.exports = route;
