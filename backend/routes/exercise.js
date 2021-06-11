const express = require("express");
const Exercise = require("../model/exercise");

const app = express();
const route = express.Router();

app.use(express.json());

route.get("/", (req, res) => {
  Exercise.find()
    .then((exercise) => {
      res.status(200).json(exercise);
    })
    .catch((err) => res.status(400).json("Error :" + err));
});

route.post("/add", (req, res) => {
  const data = {
    username: req.body.username,
    description: req.body.description,
    duration: Number(req.body.duration),
    date: Date.parse(req.body.date)
  };
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
  Exercise.findOne({ username: req.params.id })
    .then((exercise) => {
        if(exercise)
      res.json(exercise);
      else{
          res.send("No user found :(")
      }
    })
    .catch((err) => res.status(400).json("Error with id: " + err));
});


route.delete("/:id", (req, res) => {
  Exercise.findOneAndDelete({ username: req.params.id })
    .then(() => {
      res.json("Exercise Deleted");
    })
    .catch((err) => {
      res.status(400).json("Error in deletion: ", err);
    });
});

route.post("/update/:id", (req, res) => {
  Exercise.findOne({ username: req.params.id })
    .then((exercise) => {
      exercise.username = req.body.username || exercise.username;
      exercise.description = req.body.description || exercise.description;
      exercise.duration = req.body.duration || exercise.duration;
      exercise.date = Date.parse(req.body.date) || exercise.date;

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
