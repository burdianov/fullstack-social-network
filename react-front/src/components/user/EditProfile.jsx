import React, {useEffect, useState} from 'react';
import {isAuthenticated} from "../../auth";
import {getUserProfile, updateUser, updateUserProfile} from "../../api/user";
import {Redirect} from "react-router-dom";
import defaultAvatar from "../../assets/images/avatar.jpg";

const EditProfile = (props) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [about, setAbout] = useState("");
  const [redirectToProfile, setRedirectToProfile] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileSize, setFileSize] = useState(0);

  useEffect(() => {
    const userId = props.match.params.userId;
    const token = isAuthenticated().token;

    EditProfile.formData = new FormData();

    getUserProfile(userId, token)
      .then(data => {
        if (data.error) {
          setRedirectToProfile(true);
        } else {
          setId(data._id);
          setName(data.name);
          setEmail(data.email);
          setAbout(data.about);
        }
      });
  }, [props.match.params.userId]);

  const isValid = () => {
    //check if fileSize > 1Mb
    if (fileSize > 100000) {
      setError("File size should be less than 100KB.");
      setLoading(false);
      return false;
    }
    if (name.length === 0) {
      setError("Name is required.");
      setLoading(false);
      return false;
    }
    const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regEx.test(email)) {
      setError("Invalid email.");
      setLoading(false);
      return false;
    }
    if (password.length >= 1 && password.length <= 5) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return false;
    }
    return true;
  };

  const handleChange = name => e => {
    setError("");

    const value = name === "photo" ? e.target.files[0] : e.target.value;
    const fileSize = name === "photo" ? e.target.files[0].size : 0;
    setFileSize(fileSize);

    EditProfile.formData.set(name, value);

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
      case "about":
        setAbout(value);
        break;
      default:
        break;
    }
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (isValid()) {
      const userId = props.match.params.userId;
      const token = isAuthenticated().token;

      updateUserProfile(userId, token, EditProfile.formData)
        .then(data => {
          if (data.error) {
            setError(data.error);
          } else if (isAuthenticated().user.role === "admin") {
            setRedirectToProfile(true);
          } else {
            updateUser(data, () => {
              setRedirectToProfile(true);
            });
          }
        });
    }
  };

  const signupForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Profile Photo</label>
        <input
          onChange={handleChange("photo")}
          type="file"
          accept="image/*"
          className="form-control"
        />
      </div>
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
        <label className="text-muted">About</label>
        <textarea
          onChange={handleChange("about")}
          type="text"
          className="form-control"
          value={about}/>
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

  const photoUrl = id ? `${process.env.REACT_APP_API_URL}/user/photo/${id}?${new Date().getTime()}` : defaultAvatar;

  return (
    <div className="container">
      <h2 className="mt-5 mb-5">Edit Profile</h2>

      <div className="alert alert-danger"
           style={{display: error ? "" : "none"}}>
        {error}
      </div>

      {loading && <div className="jumbotron text-center">
        <h2>Loading...</h2>
      </div>}

      <img
        style={{height: "200px", width: "auto"}}
        className="img-thumbnail"
        src={photoUrl}
        onError={image => image.target.src = `${defaultAvatar}`}
        alt={name}/>

      {signupForm()}
    </div>
  );
};

export default EditProfile;