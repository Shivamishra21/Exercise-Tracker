import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ExerciseNavbar from "./components/Navbar/navbar";
import ExerciseList from "./components/Exercise-List/exercise-list";
import EditExercise from "./components/Edit-Exercise/edit-exercise";
import CreateExercise from "./components/Create-Exercise/create-exercise.js";
import CreateUser from "./components/Create-User/create-user";
import Home from "./components/Home/home";
import Login from "./components/Home/Login";
import Logout from "./components/Home/Logout";
import Protected from "./components/Protected";
function App() {
  
  return (
    <div>
    <Router>
    {/* //   <Route path="/logout" exact component={Logout} />

    //   <ExerciseNavbar />
    //   <Route path="/signup" exact component={Home} />

    //     <Route path="/login" exact component={Login} />*/}
     
      <Protected path="/logout" exact component={Logout} /> 

   {/*} //   <br />
    //    <Route path="/signup" exact component={Home} />

    //   <Route path="/login" exact component={Login} /> */}
      <Protected path="/list" exact component={ExerciseList} />
        <Protected path={"/edit/:id" } component={EditExercise} />
   {/*}   <Route path="/user" component={CreateUser} /> */}
       <Protected path="/create" component={CreateExercise} />
    
       <Route path="/" exact render={(props) => <Home {...props} />}></Route>

      <Route path="/login" render={(props) => <Home {...props} />}></Route>
     </Router>
    
    </div>
  );
}

export default App;
