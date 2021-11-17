import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/login";
import Register from "./components/register";
import Home from "./components/home";
import ChangePassword from "./components/changePassword";
import ForgotPassword from "./components/forgotPassword";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/home" component={Home}></Route>
          <Route path="/ChangePassword" component={ChangePassword}></Route>
          <Route path="/forgotPassword" component={ForgotPassword}></Route>
        </Switch>
      </Router>
    </div>
  );
}