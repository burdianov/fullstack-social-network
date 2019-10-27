import React, {useEffect, useState} from "react";
import {Redirect} from "react-router-dom";
import {getSinglePost, updatePost} from "../../api/post";
import {isAuthenticated} from "../../auth";
import defaultPostImage from "../../assets/images/mountains.jpg";

const EditPost = (props) => {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [redirectToProfile, setRedirectToProfile] = useState(false);
  const [error, setError] = useState("");
  const [fileSize, setFileSize] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const postId = props.match.params.postId;

    EditPost.postData = new FormData();

    getSinglePost(postId)
      .then(data => {
        if (data.error) {
          setRedirectToProfile(true);
        } else {
          setId(data._id);
          setTitle(data.title);
          setBody(data.body);
          setError(data.error);
        }
      });
  }, [props.match.params.postId]);

  const isValid = () => {
    //check if fileSize > 1Mb
    if (fileSize > 100000) {
      setError("File size should be less than 100KB.");
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

    EditPost.postData.set(name, value);

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
      const token = isAuthenticated().token;

      updatePost(id, token, EditPost.postData)
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

  const editPostForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Post Photo</label>
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
              className="btn btn-raised btn-primary">Update Post
      </button>
    </form>
  );

  if (redirectToProfile) {
    return <Redirect to={`/user/${isAuthenticated().user._id}`}/>;
  }

  return (
    <div className="container">
      <h2 className="mt-5 mb-5">{title}</h2>

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
        src={`${process.env.REACT_APP_API_URL}/post/photo/${id}?${new Date().getTime()}`}
        onError={image => image.target.src = `${defaultPostImage}`}
        alt={title}/>

      {editPostForm()}
    </div>
  )
};

export default EditPost;