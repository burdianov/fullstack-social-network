import React from "react";

const FollowProfileButton = (props) => {
  return (
    <div className="d-inline-block">
      {
        !props.following ?
          <button className="btn btn-success btn-raised mr-5">Follow</button> :
          <button className="btn btn-warning btn-raised">UnFollow</button>
      }
    </div>
  )
};

export default FollowProfileButton;