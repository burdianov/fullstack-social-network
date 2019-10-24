import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Menu from "./core/Menu";
import Profile from "./user/Profile";
import Users from "./user/Users";
import EditProfile from "./user/EditProfile";
import PrivateRoute from "../api/PrivateRoute";
import FindPeople from "./user/FindPeople";

const MainRouter = () => {
  return (
    <div>
      <Menu/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/users" component={Users}/>
        <Route exact path="/signup" component={Signup}/>
        <Route exact path="/signin" component={Signin}/>
        <PrivateRoute exact path="/user/edit/:userId" component={EditProfile}/>
        <PrivateRoute exact path="/findpeople" component={FindPeople}/>
        <PrivateRoute exact path="/user/:userId" component={Profile}/>
      </Switch>
    </div>
  )
};

export default MainRouter;