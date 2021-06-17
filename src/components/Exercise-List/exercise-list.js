import axios from "axios";
import React, { Component } from "react";
import ExerciseNavbar from "../Navbar/navbar";
import { Table } from "react-bootstrap";
import { Link, BrowserRouter as Router,Route } from "react-router-dom";

import EditExercise from "../Edit-Exercise/edit-exercise";
import {Button} from 'react-bootstrap'
class ExerciseList extends Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this)
    this.state = {
      arr: [],
    };
  }

  

  componentDidMount() {
    axios
      .get("/exercise/" + localStorage.getItem("username"))
      .then((res) => {
        // console.log(res.data);
        this.setState({
          arr: res.data,
        });
      })
      .catch((err) => console.log(err));
  }

  delete(e){
    e.preventDefault()
    const id = e.target.value
    axios.delete('../exercise/'+id).then((res)=>{
      console.log(res)
      console.log("Data deleted")
    }).catch((err)=>{
      console.log("Error in deleting item.")
      console.log(err)
    })


  }

  render() {
    return (
      <div>
        <ExerciseNavbar />
        <h1 className="heading">Your Progress...</h1>
        <div className="container">
          <Table striped bordered variant="dark" hover>
            <thead>
              <tr>
                <th> </th>
                <th>Description</th>
                <th>Duration</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.state.arr.map((val, i) => {
                {
                  return (
                    <tr key={i}>
                      <th>{i + 1}</th>
                      <th>{val.description}</th>
                      <th>{val.duration}</th>
                      <th>{val.date.toString().slice(0, 10)}</th>
                      <th  style={{display:"flex" , justifyContent:"space-around"}}>
                        <Link to={"/edit/" + val._id}style={{textDecoration:"none",color:"white"}} >Edit</Link>
                        <Link to={"/delete/" + val._id}><Button value={val._id} onClick = {this.delete}>Delete</Button></Link>
                      </th>
                      
                    </tr>
                  );
                }
              })}
            </tbody>
          </Table>
        </div>
        <div className="list-add">
          Want to add more exercises ...
          <br />
          <Link to="/create">Add</Link>
        </div>
      </div>
    );
  }
}

export default ExerciseList;
