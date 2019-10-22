import React from "react";

const ProfileTabs = (props) => {
  const {following, followers} = props;

  return (
    <div>
      <div>
        following
        {JSON.stringify(following)}
      </div>
      <div>
        followers
        {JSON.stringify(followers)}
      </div>
    </div>
  )
};

export default ProfileTabs;