import React, {useEffect, useState} from 'react';
import {isAuthenticated} from "../../auth";
import {getUserProfile} from "../../api/user";

const EditProfile = (props) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirectToSignin, setRedirectToSignin] = useState(false);

  useEffect(() => {
    const userId = props.match.params.userId;
    const token = isAuthenticated().token;

    getUserProfile(userId, token)
      .then(data => {
        if (data.error) {
          setRedirectToSignin(true);
        } else {
          setId(data._id);
          setName(data.name);
          setEmail(data.email);
        }
      });
  }, [props.match.params.userId]);

  return (
    <div className="container">
      <h2 className="mt-5 mb-5">Edit Profile</h2>
    </div>
  );
};

export default EditProfile;