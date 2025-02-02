import "../index.css";
import React, { useState, useEffect } from "react";
import UserForm from "../component/UserForm";

export default function Profile() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.log(err));
  }, []);

  // Function to update the user list after adding a new user
  const handleUserAdded = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  return (
    <div className="container mt-4 mulish-font">
      <h1 className="text-center mb-4">Registered Users</h1>
      <div className="row">
        <div className="col">
          <UserForm onUserAdded={handleUserAdded} />  {/* Include UserForm and pass handleUserAdded as a prop */}
        </div>
        <div className="col">
          <h3>Users List</h3>
          {users.map((user) => (
            <div key={user.id} className="col-12">
              <div className="card shadow-lg mb-3">
                <div className="card-body">
                  <h5 className="card-title">{user.name}</h5>
                  <p className="card-text">
                    <strong>Email:</strong> {user.email}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
