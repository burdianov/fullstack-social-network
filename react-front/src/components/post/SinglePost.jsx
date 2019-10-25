import React from "react";

const SinglePost = (props) => {
  return (
    <div>
      <h2>Single post</h2>
      {props.match.params.postId}
    </div>
  )
};

export default SinglePost;