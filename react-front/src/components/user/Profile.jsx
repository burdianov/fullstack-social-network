import React, {useEffect, useState} from 'react';
import {isAuthenticated} from "../../auth";
import {Link, Redirect} from "react-router-dom";
import {getUserProfile} from "../../api/user";
import DeleteUser from "./DeleteUser";
import defaultAvatar from "../../assets/images/avatar.jpg";
import FollowProfileButton from "./FollowProfileButton";
import ProfileTabs from "./ProfileTabs";
import {getPostsByUser} from "../../api/post";

const Profile = (props) => {
  const [user, setUser] = useState({
    following: [], followers: []
  });
  const [redirectToSignin, setRedirectToSignin] = useState(false);
  const [following, setFollowing] = useState(false);
  const [error, setError] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const userId = props.match.params.userId;
    const token = isAuthenticated().token;
    getUserProfile(userId, token)
      .then(data => {
        if (data.error) {
          setRedirectToSignin(true);
        } else {
          let following = checkFollow(data);
          setUser(data);
          setFollowing(following);
          loadPosts(data._id);
        }
      });
  }, [props.match.params.userId]);

  const loadPosts = userId => {
    const token = isAuthenticated().token;
    getPostsByUser(userId, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setPosts(data);
      }
    });
  };

  const checkFollow = (user) => {
    const jwt = isAuthenticated();
    const match = user.followers.find(follower => {
      return follower._id === jwt.user._id;
    });
    return match;
  };

  const clickFollowButton = callApi => {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;

    callApi(userId, token, user._id)
      .then(data => {
        if (data.error) {
          setError(data.error);
        } else {
          setUser(data);
          setFollowing(!following);
        }
      });
  };

  const photoUrl = user._id ? `${process.env.REACT_APP_API_URL}/user/photo/${user._id}?${new Date().getTime()}` : defaultAvatar;

  if (redirectToSignin) {
    return <Redirect to="/signin"/>
  } else {
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Profile</h2>
        <div className="row">
          <div className="col-md-4">
            <img style={{height: "200px", width: "auto"}}
                 className="img-thumbnail"
                 src={photoUrl}
                 onError={image => image.target.src = `${defaultAvatar}`}
                 alt={user.name}
            />
          </div>
          <div className="col-md-8 mt-2">
            <div className="lead">
              <p>Hello {user.name}</p>
              <p>Email: {user.email}</p>
              <p>{`Joined ${new Date(user.createdAt).toDateString()}`}</p>
            </div>
            {isAuthenticated().user && isAuthenticated().user._id === user._id ? (
              <div className="d-inline-block">
                <Link
                  to={`/post/create`}
                  className="btn btn-raised btn-success mr-5">
                  Create Post
                </Link>
                <Link
                  to={`/user/edit/${user._id}`}
                  className="btn btn-raised btn-info mr-5">
                  Edit Profile
                </Link>
                <DeleteUser userId={user._id}/>
              </div>
            ) : (
              <FollowProfileButton
                following={following}
                onButtonClick={clickFollowButton}
              />
            )}
            <div>
              {isAuthenticated().user && isAuthenticated().user.role === "admin" && (
                <div className="card mt-5">
                  <div className="card-body">
                    <h5 className="card-title">
                      Admin
                    </h5>
                    <p className="mb-2 text-danger">
                      Edit/Delete as an Admin
                    </p>
                    <Link
                      className="btn btn-raised btn-success mr-5"
                      to={`/user/edit/${user._id}`}
                    >
                      Edit Profile
                    </Link>
                    <DeleteUser userId={user._id}/>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 mt-5 mb-5">
            <hr/>
            <p className="lead">{user.about}</p>
            <hr/>
            <ProfileTabs
              followers={user.followers}
              following={user.following}
              posts={posts}
            />
          </div>
        </div>
      </div>
    );
  }
};

export default Profile;