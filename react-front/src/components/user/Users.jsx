import React, {useState, useEffect} from "react";
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
  });

  return (
    <div  className="container">
      <h2 className="mt-5 mb-5">Users</h2>
    </div>
  );
};

export default Users;