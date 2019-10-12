import React, {useEffect, useState} from 'react';
import {isAuthenticated} from "../../auth";
import {Redirect} from "react-router-dom";

const Profile = (props) => {
    const [user, setUser] = useState("");
    const [redirectToSignin, setRedirectToSignin] = useState(false);

    const {name, email} = isAuthenticated().user;

    useEffect(() => {
        const userId = props.match.params.userId;
        fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${isAuthenticated().token}`
            }
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                if (data.error) {
                    setRedirectToSignin(true);
                } else {
                    setUser(data);
                }
            });
    }, []);
    
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