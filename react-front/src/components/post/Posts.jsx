import React, {useEffect, useState} from "react";
import {getAllPosts} from "../../api/post";
import defaultPostPhoto from "../../assets/images/mountains.jpg"
import {Link} from "react-router-dom";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getAllPosts().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setPosts(data);
      }
    });
  }, []);

  const renderPosts = () => {
    return (
      <div className="row">
        {posts.map((post, i) => {
          const posterId = post.postedBy ? `/user/${post.postedBy._id}` : "";
          const posterName = post.postedBy ? post.postedBy.name : " Unknown";
          return (
            <div key={i} className="card col-md-4">
              <div className="card-body">
                <img
                  src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
                  alt={post.title}
                  onError={image => image.target.src = `${defaultPostPhoto}`}
                  className="img-thumbnail mb-3"
                  style={{height: "200px", width: "auto"}}/>
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.body.substring(0, 100)}</p>
                <br/>
                <p className="font-italic mark">
                  Posted by <Link to={`${posterId}`}>{posterName}</Link>
                  {" "} on {new Date(post.createdAt).toDateString()}
                </p>
                <Link
                  to={`/post/${post._id}`}
                  className="btn btn-primary btn-raised btn-sm"
                >
                  Read more...
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    )
  };

  return (
    <div className="container">
      <h2 className="mt-5 mb-5">Recent Posts</h2>
      {renderPosts()}
    </div>
  );
};

export default Posts;