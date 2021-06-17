import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./navbarStyle.css";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
export default function ExerciseNavbar() {
  const history = useHistory();

  const classes = useStyles();

  // useEffect(() => {
  //   if (localStorage.getItem("jwt")) {
  //     history.push("/list");
  //   }
  // }, []);

  // let logout = null
  // if(localStorage.getItem('jwt')){
  //    logout = <Link to="/logout">Logout</Link>
  // }

  const logout = (e) => {
    e.preventDefault();
    axios
      .get("/users/logout")
      .then((res) => {
        console.log(res);
        localStorage.clear();
        window.location = "/";
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          
          <Typography variant="h6" className={classes.title}>
            Exercise Tracker
          </Typography>
         
              <Typography>
                {" "}
                <Link to="/create" className="nav-links">
                  Create Exercise Log
                </Link>
              </Typography>
              <Typography>
                {" "}
                <Link to="/list" className="nav-links">
                  Your Exercises
                </Link>
              </Typography>
              <Link to="/logout" className="nav-links">
                <Button color="inherit" onClick={logout}>
                  Logout
                </Button>{" "}
              </Link>
        
        </Toolbar>
      </AppBar>
    </div>
  );
}
