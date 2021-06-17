import React, { useEffect } from "react";
import {
  Link,
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import "./homeStyle.css";
import Signup from "./signup";
import Login from "./Login";

function Home() {
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      history.push("/list");
    }
  }, []);
  return (
    <Router>
      <div className="home-background">
        <div className="home-container">
          <h1 className="heading">Exercise Tracker</h1>
          <div className="nav">
            <Link to="/" className="links">
              Signup
            </Link>
            <Link to="/login" className="links">
              Login
            </Link>
          </div>
          <div className="components">
            <div className="thought">
              <b>“When you feel like quitting, think about why you started.”</b>
              <br />
              <br />
              <div>Your consistency is our responsibility</div>
            </div>
            {/* <div className="home-image1" /> */}

            <Switch>
              <Route path="/" exact component={Signup} />
              {/* <Signup /> */}

              <Route path="/login" exact component={Login} />
              {/* <Login /> */}
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default Home;
