import React, { Component } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

function EditExercise(props) {
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState("");

  useEffect(() => {
    // console.log(history);
    console.log(props);
    axios
      .get("../exercise/update/" + props.match.params.id)
      .then((res) => {
        console.log(res.data);
        setDescription(
           res.data.description
        ); 
        setDuration( res.data.duration );
        setDate( res.data.date);
       
      })
      
      .catch((err) => {
        console.log(err);
      });
  },[]);

  const onChangeDate = (e) => {
    setDate(
       e.target.value,
    );
  };

  const onChangeDuration = (e) => {
    setDuration( e.target.value,
    );
  };

  const onChangeDescription = (e) => {
    setDescription( e.target.value,
    );
    console.log(description)
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const exercise = {
      username: localStorage.getItem("username"),
      duration: duration,
      date: date,
      description: description,
    };

    console.log("Exercises: ", exercise);
    axios
      .post("../exercise/update/" + props.match.params.id, exercise)
      .then((res) => console.log(res.data))
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <h3>Update exercise log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Description: </label>
          <input
            type="text"
            required
            className="form-control"
            value={description}
            onChange={onChangeDescription}
          />
        </div>
        <div className="form-group">
          <label>Duration: </label>
          <input
            type="text"
            required
            className="form-control"
            value={duration}
            onChange={onChangeDuration}
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <input
            type="date"
            required
            className="form-control"
            value={date}
            onChange={onChangeDate}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create Exercise Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}

export default EditExercise;
