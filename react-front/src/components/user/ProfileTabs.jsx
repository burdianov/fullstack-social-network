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
          {followers.map((person, i) => (
              <div key={i}>
                <div>
                  <Link to={`/user/${person._id}`}>
                    <img
                      style={{borderRadius: "50%", border: "1px solid grey"}}
                      className="float-left mr-2"
                      height="30px"
                      width="30px"
                      onError={image => (image.target.src = `${defaultAvatar}`)}
                      src={`${process.env.REACT_APP_API_URL}/user/photo/${person._id}`}
                      alt={person.name}/>
                    <div>
                      <p className="lead">{person.name}</p>
                    </div>
                  </Link>
                </div>
              </div>
            )
          )}
        </div>
        <div className="col-md-4">
          <h3 className="text-primary">Following</h3>
          <hr/>
          {following.map((person, i) => (
              <div key={i}>
                <div>
                  <Link to={`/user/${person._id}`}>
                    <img
                      style={{borderRadius: "50%", border: "1px solid grey"}}
                      className="float-left mr-2"
                      height="30px"
                      width="30px"
                      onError={image => (image.target.src = `${defaultAvatar}`)}
                      src={`${process.env.REACT_APP_API_URL}/user/photo/${person._id}`}
                      alt={person.name}/>
                    <div>
                      <p className="lead">{person.name}</p>
                    </div>
                  </Link>
                </div>
              </div>
            )
          )}
        </div>
        <div className="com-md-4">
          <h3 className="text-primary">Posts</h3>
          <hr/>
        </div>
      </div>
    </div>
  );
};

export default ProfileTabs;