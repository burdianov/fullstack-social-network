import React from "react";
import {Link, withRouter} from "react-router-dom";
import {isAuthenticated, signout} from "../../auth";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return {color: "#ff9900"};
  } else {
    return {color: "#ffffff"}
  }
};

const Menu = ({history}) => {
  return (
    <div>
      <ul className="nav nav-tabs bg-primary">
        <li className="nav-item">
          <Link className="nav-link" style={isActive(history, "/")}
                to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" style={isActive(history, "/users")}
                to="/users">Users</Link>
        </li>
        {!isAuthenticated() && (
          <>
            <li className="nav-item">
              <Link className="nav-link"
                    style={isActive(history, "/signin")}
                    to="/signin">Sign
                In</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link"
                    style={isActive(history, "/signup")}
                    to="/signup">Sign
                Up</Link>
            </li>
          </>
        )}
        {isAuthenticated() && (
          <>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={
                  isActive(history, `/findpeople`)}
                to={`/findpeople`}>
                Find People
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={
                  isActive(history, `/post/create`)}
                to={`/post/create`}>
                Create Post
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={
                  isActive(history, `/user/${isAuthenticated().user._id}`)}
                to={`/user/${isAuthenticated().user._id}`}>
                {`${isAuthenticated().user.name}'s profile`}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/"
                    style={{cursor: "pointer", color: "#fff"}}
                    onClick={() => signout(() => {
                      history.push('/');
                    })}>
                Sign Out
              </Link>
            </li>
          </>)}
      </ul>
    </div>
  );
};

export default withRouter(Menu);