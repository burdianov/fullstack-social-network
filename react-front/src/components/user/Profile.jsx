import React, {useEffect, useState} from 'react';
import {isAuthenticated} from "../../auth";
import {Link, Redirect} from "react-router-dom";
import {getUserProfile} from "../../api/user";
import defaultAvatar from "../../assets/images/avatar.jpg";
import DeleteUser from "./DeleteUser";

const Profile = (props) => {
  const [user, setUser] = useState("");
  const [redirectToSignin, setRedirectToSignin] = useState(false);

  useEffect(() => {
    const userId = props.match.params.userId;
    const token = isAuthenticated().token;
    getUserProfile(userId, token)
      .then(data => {
        if (data.error) {
          setRedirectToSignin(true);
        } else {
          setUser(data);
        }
      });
  }, [props.match.params.userId]);

  if (redirectToSignin) {
    return <Redirect to="/signin"/>
  } else {
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Profile</h2>
        <div className="row">
          <div className="col-md-6">
            <img
              className="card-img-top"
              src={defaultAvatar}
              alt={user.name}
              style={{width: "100%", height: "15vw", objectFit: "cover"}}
            />
          </div>
          <div className="col-md-6 mt-2">
            <div className="lead">
              <p>Hello {user.name}</p>
              <p>Email: {user.email}</p>
              <p>{`Joined ${new Date(user.createdAt).toDateString()}`}</p>
            </div>
            {isAuthenticated().user && isAuthenticated().user._id === user._id && (
              <div className="d-inline-block">
                <Link
                  to={`/user/edit/${user._id}`}
                  className="btn btn-raised btn-success mr-5">
                  Edit Profile
                </Link>
                <DeleteUser userId={user._id}/>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default Profile;