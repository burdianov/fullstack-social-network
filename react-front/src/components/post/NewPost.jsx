import React, {useEffect, useState} from 'react';
import {isAuthenticated} from "../../auth";
import {Redirect} from "react-router-dom";
import {createPost} from "../../api/post";

const NewPost = (props) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [fileSize, setFileSize] = useState(0);
  const [redirectToProfile, setRedirectToProfile] = useState(false);

  useEffect(() => {
    const userId = props.match.params.userId;
    const token = isAuthenticated().token;

    NewPost.postData = new FormData();
    setUser(isAuthenticated().user);
  }, [props.match.params.userId]);

  const isValid = () => {
    //check if fileSize > 1Mb
    if (fileSize > 100000) {
      setError("File size should be less than 1Mb.");
      return false;
    }
    if (title.length === 0 || body.length === 0) {
      setError("All fields are required.");
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

    NewPost.postData.set(name, value);

    switch (name) {
      case "title":
        setTitle(value);
        break;
      case "body":
        setBody(value);
        break;
      default:
        break;
    }
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (isValid()) {
      const userId = isAuthenticated().user._id;
      const token = isAuthenticated().token;

      createPost(userId, token, NewPost.postData)
        .then(data => {
          if (data.error) {
            setError(data.error);
          } else {
            setLoading(false);
            setTitle("");
            setBody("");
            setRedirectToProfile(true);
          }
        });
    }
  };

  const newPostForm = (title, body) => (
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
        <label className="text-muted">Title</label>
        <input
          onChange={handleChange("title")}
          type="text"
          className="form-control"
          value={title}/>
      </div>
      <div className="form-group">
        <label className="text-muted">Body</label>
        <textarea
          onChange={handleChange("body")}
          type="text"
          className="form-control"
          value={body}/>
      </div>
      <button onClick={clickSubmit}
              className="btn btn-raised btn-primary">Create Post
      </button>
    </form>
  );

  if (redirectToProfile) {
    return <Redirect to={`/user/${user._id}`}/>;
  }

  return (
    <div className="container">
      <h2 className="mt-5 mb-5">Create post</h2>

      <div className="alert alert-danger"
           style={{display: error ? "" : "none"}}>
        {error}
      </div>

      {loading && <div className="jumbotron text-center">
        <h2>Loading...</h2>
      </div>}

      {newPostForm(title, body)}
    </div>
  );
};

export default NewPost;