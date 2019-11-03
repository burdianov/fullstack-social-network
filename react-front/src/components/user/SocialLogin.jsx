import React, {useState} from "react";
import {Redirect} from "react-router-dom";
import GoogleLogin from "react-google-login";
import {authenticate, socialLogin} from "../../auth";

const SocialLogin = () => {
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);

  const responseGoogle = response => {
    const {googleId, name, email, imageUrl} = response.profileObj;
    const user = {
      password: googleId,
      name: name,
      email: email,
      imageUrl: imageUrl
    };
    socialLogin(user).then(data => {
      if (data.error) {
        console.log("Login error. Please try again.");
      } else {
        authenticate(data, () => {
          setRedirectToReferrer(true);
        });
      }
    })
  };
  if (redirectToReferrer) {
    return <Redirect to="/"/>
  }
  return (
    <div className="container">
      <GoogleLogin
        clientId="177316628624-35qpr0ic10kro7j5g3joqv3fjeini88v.apps.googleusercontent.com"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      />
    </div>
  );
};

export default SocialLogin;