import React from "react";

const EditPost = (props) => {
  return (
    <div>
      <h2>Edit post</h2>
      {props.match.params.postId}
    </div>
  )
};

export default EditPost;