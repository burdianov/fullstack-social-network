import React, {useEffect, useState} from "react";
import {getSinglePost} from "../../api/post";
import defaultPostPhoto from "../../assets/images/mountains.jpg";
import {Link} from "react-router-dom";

const SinglePost = (props) => {
  const [post, setPost] = useState("");

  useEffect(() => {
    getSinglePost(props.match.params.postId)
      .then(data => {
        if (data.error) {
          console.log(data.error)
        } else {
          setPost(data);
        }
      });
  }, []);

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
        <p className="card-text">{post.body}</p>
        <br/>
        <p className="font-italic mark">
          Posted by <Link to={`${posterId}`}>{posterName}</Link>
          {" "} on {new Date(post.createdAt).toDateString()}
        </p>
        <Link
          to={"/"}
          className="btn btn-primary btn-raised btn-sm"
        >
          Back to posts
        </Link>
      </div>
    );
  };

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
