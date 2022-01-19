import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UserList() {

  const [listOfUsers, setListOfUsers] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/admin/users/list").then((response) => {
      setListOfUsers(response.data);
    });
  }, []);

  const deleteUser = (id) => {
    axios.put(`http://localhost:3001/admin/users/delete/${id}`, {
      headers: { accessToken: localStorage.getItem("accessToken") },
    }).then(() => {
      window.location.reload(false);
    });
  };

  return (
    <div>
      <h5>List of Users</h5>
      {listOfUsers.map((value, key) => {
        return (
          <div key={key} className="card m-2">
            <div className="card-body">
              <p className="card-title"><b>Full Name:</b>&nbsp;{value.firstName}&nbsp;{value.lastName}</p>
              <p className="card-text"><b>Email:</b>&nbsp;{value.email}</p>
              <p className="cart-text"><b>Role:</b>&nbsp;{value.role}</p>
              <p className="cart-text"><b>isLocal:</b>&nbsp;{value.isLocal}</p>
              <p className="cart-text"><b>Account Status:</b>&nbsp;{value.status}</p>
              <button type="button" className="btn btn-primary" onClick={() => { navigate(`/admin/list`) }}>Edit</button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  deleteUser(value.id)
                }}>Delete</button>
            </div>
          </div>
        );
      })}
    </div>
  )
}

export default UserList