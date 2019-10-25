import React, {useEffect, useState} from "react";
import {getSinglePost} from "../../api/post";

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

  return (
    <div>
      <h2>Single post</h2>
      {JSON.stringify(post)}
    </div>
  )
};

export default SinglePost;
