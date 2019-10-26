import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import {isAuthenticated, signout} from "../../auth";
import {removeUser} from "../../api/user";

const DeleteUser = (props) => {
  const [redirect, setRedirect] = useState(false);

  const deleteAccount = () => {
    const token = isAuthenticated().token;
    const userId = props.userId;
    removeUser(userId, token)
      .then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          signout(() => {
            console.log("User deleted.")
          });
          setRedirect(true);
        }
      });
  };

  const deleteConfirmed = () => {
    let answer = window.confirm("Are you sure you want to delete your account?");
    if (answer) {
      deleteAccount();
    }
  };

  return (
    (redirect) ?
      <Redirect to="/"/> :
      <button onClick={deleteConfirmed} className="btn btn-raised btn-danger">
        Delete Profile
      </button>
  )
};

export default DeleteUser;