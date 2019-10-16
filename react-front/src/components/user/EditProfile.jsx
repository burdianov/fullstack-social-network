import React, {useEffect, useState} from 'react';
import {isAuthenticated} from "../../auth";
import {getUserProfile, updateUserProfile} from "../../api/user";
import {Redirect} from "react-router-dom";

const EditProfile = (props) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirectToProfile, setRedirectToProfile] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const userId = props.match.params.userId;
    const token = isAuthenticated().token;

    getUserProfile(userId, token)
      .then(data => {
        if (data.error) {
          setRedirectToProfile(true);
        } else {
          setId(data._id);
          setName(data.name);
          setEmail(data.email);
        }
      });
  }, [props.match.params.userId]);

  const handleChange = name => e => {
    const value = e.target.value;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    const user = {
      name,
      email,
      password: password || undefined
    };
    const userId = props.match.params.userId;
    const token = isAuthenticated().token;

    updateUserProfile(userId, token, user)
      .then(data => {
        if (data.error) {
          setError(data.error);
        } else {
          setRedirectToProfile(true);
        }
      });
  };

  const signupForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={handleChange("name")}
          type="text"
          className="form-control"
          value={name}/>
      </div>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={handleChange("email")}
          type="email"
          className="form-control"
          value={email}/>
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={handleChange("password")}
          type="password"
          className="form-control"
          value={password}/>
      </div>
      <button onClick={clickSubmit}
              className="btn btn-raised btn-primary">Update
      </button>
    </form>
  );

  if (redirectToProfile) {
    return <Redirect to={`/user/${id}`}/>;
  }
  return (
    <div className="container">
      <h2 className="mt-5 mb-5">Edit Profile</h2>


      {signupForm()}
    </div>
  );
};

export default EditProfile;