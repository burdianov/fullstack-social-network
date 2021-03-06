import React, {useEffect, useState} from "react";
import {getSinglePost, likePost, removePost, unlikePost} from "../../api/post";
import defaultPostPhoto from "../../assets/images/mountains.jpg";
import {Link, Redirect} from "react-router-dom";
import {isAuthenticated} from "../../auth";

const SinglePost = (props) => {
  const [post, setPost] = useState("");
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [redirectToSignin, setRedirectToSignin] = useState(false);
  const [like, setLike] = useState(false);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    getSinglePost(props.match.params.postId)
      .then(data => {
        if (data.error) {
          console.log(data.error)
        } else {
          setPost(data);
          setLikes(data.likes.length);
          setLike(checkLike(data.likes));
        }
      });
  }, [props.match.params.postId]);

  const checkLike = (likes) => {
    const userId = isAuthenticated() && isAuthenticated().user._id;
    return likes.indexOf(userId) !== -1;
  };

  const deletePost = () => {
    const postId = props.match.params.postId;
    const token = isAuthenticated().token;
    removePost(postId, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setRedirectToHome(true);
      }
    });
  };

  const deleteConfirmed = () => {
    let answer = window.confirm("Are you sure you want to delete the post?");
    if (answer) {
      deletePost();
    }
  };

  const toggleLike = () => {
    if (!isAuthenticated()) {
      setRedirectToSignin(true);
      return false;
    }
    let callApi = like ? unlikePost : likePost;
    const userId = isAuthenticated().user._id;
    const postId = post._id;
    const token = isAuthenticated().token;
    callApi(userId, token, postId).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setLike(!like);
        setLikes(data.likes.length);
      }
    });
  };

  const renderPost = () => {
    const posterId = post.postedBy ? `/user/${post.postedBy._id}` : "";
    const posterName = post.postedBy ? post.postedBy.name : " Unknown";
    return (
      <div className="card-body">
        <img
          src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
          alt={post.title}
          onError={image => image.target.src = `${defaultPostPhoto}`}
          className="img-thumbnail mb-3"
          style={{height: "300px", width: "100%", objectFit: "cover"}}/>
        {like ? (<h3 onClick={toggleLike}>
            <i className="fa fa-thumbs-up text-success bg-dark"
               style={{padding: "10px", borderRadius: "50%"}}/> {likes} Like
          </h3>)
          : (<h3 onClick={toggleLike}>
            <i className="fa fa-thumbs-up text-warning bg-dark"
               style={{padding: "10px", borderRadius: "50%"}}/> {likes} Like
          </h3>)}
        <p className="card-text">{post.body}</p>
        <br/>
        <p className="font-italic mark">
          Posted by <Link to={`${posterId}`}>{posterName}</Link>
          {" "} on {new Date(post.createdAt).toDateString()}
        </p>
        <div className="d-inline-block">
          <Link
            to={"/"}
            className="btn btn-primary btn-raised btn-sm mr-5"
          >
            Back to posts
          </Link>
          {isAuthenticated().user && isAuthenticated().user._id === post.postedBy._id && (
            <>
              <Link
                to={`/post/edit/${post._id}`}
                className="btn btn-info btn-raised btn-sm mr-5"
              >
                Update Post
              </Link>
              <button onClick={deleteConfirmed}
                      className="btn btn-raised btn-danger">
                Delete Post
              </button>
            </>
          )}
          <div>
            {isAuthenticated().user && (
              <div className="card mt-5">
                <h5 className="card-title">Admin</h5>
                <p className="mb-2 text-danger">
                  Edit/Delete as an Admin
                </p>
                <Link
                  to={`/post/edit/${post._id}`}
                  className="btn btn-raised btn-warning btn-sm mr-5"
                >
                  Update Post
                </Link>
                <button
                  onClick={deleteConfirmed}
                  className="btn btn-raised btn-danger"
                >
                  Delete Post
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  {
    if (redirectToHome) {
      return <Redirect to="/"/>
    } else if (redirectToSignin) {
      return <Redirect to={"/signin"}/>
    }
  }

  return (
    <div className="container">
      <h2 className="display-2 mt-5 mb-5">{post.title}</h2>
      {!post ? (
        <div className="jumbotron text-center">
          <h2>Loading...</h2>
        </div>
      ) : (
        renderPost(post))
      }
    </div>
  );
};

export default SinglePost;
