import React from 'react';

const DeleteUser = () => {
  const deleteAccount = () => {
    console.log("delete account");
  };

  const deleteConfirmed = () => {
    let answer = window.confirm("Are you sure you want to delete your account?");
    if (answer) {
      deleteAccount();
    }
  };

  return (
    <button onClick={deleteConfirmed} className="btn btn-raised btn-danger">
      Delete Profile
    </button>
  )
};

export default DeleteUser;