import React, {useEffect, useState} from 'react';
import {isAuthenticated} from "../../auth";

const Profile = (props) => {
    const [user, setUser] = useState("");
    const [redirectToSignin, setRedirectToSignin] = useState(false);

    const {name, email} = isAuthenticated().user;

    useEffect(() => {
        console.log("user id from route params: ", props.match.params.userId)
    }, []);

    return (
        <div className="container">
            <h2 className="mt-5 mb-5">Profile</h2>
            <p>Hello {name}</p>
            <p>Email: {email}</p>
        </div>
    );
};

export default Profile;