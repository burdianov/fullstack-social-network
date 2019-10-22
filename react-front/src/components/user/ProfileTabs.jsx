import React from "react";
import {Link} from "react-router-dom";
import defaultAvatar from "../../assets/images/avatar.jpg";

const ProfileTabs = (props) => {
  const {following, followers} = props;

  return (
    <div>
      <div className="row">
        <div className="col-md-4">
          <h3 className="text-primary">Followers</h3>
          <hr/>
          {followers.map((follower, i) => (
              <div key={i}>
                <div className="row">
                  <div>
                    <Link to={`/user/${follower._id}`}>
                      <img
                        className="float-left mr-2"
                        height="30px"
                        onError={image => (image.target.src = `${defaultAvatar}`)}
                        src={`${process.env.REACT_APP_API_URL}/user/photo/${follower._id}`}
                        alt={follower.name}/>
                      <div>
                        <h3>{follower.name}</h3>
                      </div>
                    </Link>
                    <p style={{clear: "both"}}>
                      {follower.about}
                    </p>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileTabs;