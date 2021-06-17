import axios from "axios";
import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ExerciseNavbar from "../Navbar/navbar";
import "../Home/homeStyle.css";

class CreateExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      description: "",
      duration: "",
      date: "",
    };
  }

  onChangeDate(e) {
    this.setState({
      date: e.target.value,
    });
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const exercise = {
      username: localStorage.getItem("username"),
      duration: this.state.duration,
      date: this.state.date,
      description: this.state.description,
    };

    console.log("Exercises: ", exercise);
    axios
      .post("/exercise/add", exercise)
      .then((res) => {
        console.log(res.data);
        window.location = "/list";
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <ExerciseNavbar />
        <div className="container" style={{ fontFamily: "Poppins,sans-serif" }}>
          <form onSubmit={this.onSubmit} className="create-exercise">
            <center>
              <h3>Create new exercise log</h3>
            </center>

            <div style={{opacity:"0.91"}}>
              <div className="form-group">
                <label>Description: </label>
                <input
                  type="text"
                  required
                  className="form-control"
                  value={this.state.description}
                  onChange={this.onChangeDescription}
                  placeholder="Enter your workout description"
                />
              </div>
              <div className="form-group">
                <label>Duration (in minutes): </label>
                <input
                  type="number"
                  required
                  className="form-control"
                  value={this.state.duration}
                  onChange={this.onChangeDuration}
                  placeholder="Duration of workout"
                />
              </div>
              <div className="form-group">
                <label>Date: </label>
                <input
                  type="date"
                  required
                  className="form-control"
                  value={this.state.date}
                  onChange={this.onChangeDate}
                  placeholder="Date of workout in dd/mm/yyyy form"
                />
              </div>
            </div>
            <div className="form-group">
              <input
                type="submit"
                value="Create Exercise Log"
                className="btn btn-primary create-button"
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateExercise;
