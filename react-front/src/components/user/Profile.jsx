import React, {useEffect, useState} from 'react';
import {isAuthenticated} from "../../auth";
import {Redirect} from "react-router-dom";
import {getUserProfile} from "../../api/user";

const Profile = (props) => {
    const [user, setUser] = useState("");
    const [redirectToSignin, setRedirectToSignin] = useState(false);

    const {name, email} = isAuthenticated().user;

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
        return (<div className="container">
                <h2 className="mt-5 mb-5">Profile</h2>
                <p>Hello {name}</p>
                <p>Email: {email}</p>
                <p>{`Joined ${new Date(user.createdAt).toDateString()}`}</p>
            </div>
        );
    }
};

export default Profile;