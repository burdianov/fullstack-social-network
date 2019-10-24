import React, {useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import {findPeople} from "../../api/user";
import defaultAvatar from "../../assets/images/avatar.jpg";
import {isAuthenticated} from "../../auth";

const FindPeople = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;

    findPeople(userId, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setUsers(data);
      }
    });
  }, []);

  const renderUsers = () => {
    return (
      <div className="row">
        {users.map((user, i) => {

          return (
            <div key={i} className="card col-md-4">
              <img style={{height: "200px", width: "auto"}}
                   className="img-thumbnail"
                   src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`}
                   onError={image => image.target.src = `${defaultAvatar}`}
                   alt={user.name}
              />
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text">{user.email}</p>
                <Link
                  to={`/user/${user._id}`}
                  className="btn btn-primary btn-raised btn-sm"
                >
                  View Profile
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    )
  };

  return (
    <div className="container">
      <h2 className="mt-5 mb-5">Find People</h2>
      {renderUsers()}
    </div>
  );
};

export default FindPeople;