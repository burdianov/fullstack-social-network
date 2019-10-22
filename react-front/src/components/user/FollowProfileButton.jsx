import React from "react";
import {follow} from "../../api/user";

const FollowProfileButton = (props) => {
  const followClick = () => {
    props.onButtonClick(follow);
  };

  return (
    <div className="d-inline-block">
      {
        !props.following ?
          <button
            onClick={followClick}
            className="btn btn-success btn-raised mr-5"
          >Follow</button> :
          <button className="btn btn-warning btn-raised">UnFollow</button>
      }
    </div>
  )
};

export default FollowProfileButton;