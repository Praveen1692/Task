import React, { useState } from "react";
import "./Style.css";

function Task() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userData, setUserData] = useState([]);
  const [nextId, setNextId] = useState(1);
  const [editId, setEditId] = useState(null);

  const handleButtonClick = () => {
    if (name && email) {
      if (editId === null) {
        setUserData([...userData, { id: nextId, name, email }]);
        setNextId(nextId + 1);
      } else {
        setUserData(
          userData.map((user) =>
            user.id === editId ? { ...user, name, email } : user
          )
        );
        setEditId(null);
      }
      setName("");
      setEmail("");
    } else {
      alert("Please fill out both fields");
    }
  };

  const handleEdit = (id) => {
    const user = userData.find((user) => user.id === id);
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setEditId(id);
    }
  };

  const handleDelete = (id) => {
    setUserData(userData.filter((user) => user.id !== id));
  };

  return (
    <div className="App">
      <form>
        <div>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
          </label>
        </div>

        <div>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </label>
        </div>

        <button type="button" onClick={handleButtonClick}>
          {editId === null ? "Add user" : "Update"}
        </button>
      </form>

      {userData.length > 0 && (
        <div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <button id="edit" onClick={() => handleEdit(user.id)}>
                      Edit
                    </button>
                    <button id="dlt" onClick={() => handleDelete(user.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Task;
