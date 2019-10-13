import React, {useEffect, useState} from "react";
import {getAllUsers} from "../../api/user";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setUsers(data);
      }
    });
  },[]);

  const renderUsers = () => {
    return (
      <div className="row">
        {users.map((user, i) => {
          return (
            <div key={i} className="card col-md-4">
              <img className="card-img-top" src="" alt="Card image cap"/>
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text">{user.email}</p>
                <a href="#" className="btn btn-primary btn-raised btn-sm">View
                  Profile</a>
              </div>
            </div>
          );
        })}
      </div>
    )
  };

  return (
    <div className="container">
      <h2 className="mt-5 mb-5">Users</h2>
      {renderUsers()}
    </div>
  );
};

export default Users;