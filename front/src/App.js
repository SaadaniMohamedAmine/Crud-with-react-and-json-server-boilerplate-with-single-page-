import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [users, setUsers] = useState([]);
  const [updated, setUpdated] = useState(false);
  const [newUser, setNewUser] = useState({
    id: uuidv4(),
    name: "",
    age: 0,
    career: "",
  });

  //messages
  const notify1 = () => toast.success("New user is created !!");
  const notify2 = () => toast.success("The user is updated successfully !!");
  const notify3 = () => toast.warning("The user is deleted");

  //get all the suers
  const fetchUsers = async () => {
    const list = await axios.get("http://localhost:3001/contacts");
    setUsers(list.data);
  };

  //add new User
  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const fill = (existUser) => {
    setUpdated(true);
    setNewUser(existUser);
  };
  //update user
  const updateUser = async (id, user) => {
    const request = await axios.put(
      `http://localhost:3001/contacts/${id}`,
      user
    );
    notify2();
    setNewUser({
      id: uuidv4(),
      name: "",
      age: 0,
      career: "",
    });
    fetchUsers();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (updated === false) {
      const request = await axios.post(
        "http://localhost:3001/contacts",
        newUser
      );
      notify1();
      setNewUser({
        id: uuidv4(),
        name: "",
        age: 0,
        career: "",
      });
      fetchUsers();
    } else {
      updateUser(newUser.id, newUser);
    }
  };

  //delete a user
  const deleteUser = async (id) => {
    const request = await axios.delete(`http://localhost:3001/contacts/${id}`);
    notify3();
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <React.Fragment>
      <div className="container-fluid p-0">
        <h1 className="bg-dark text-center text-light py-5">
          Crud with react and json server
        </h1>
        <div className="container">
          <div className="row gx-5">
            <div className="col lg-6 col-md-6 col-sm-12 py-3">
              <form action="" className="border p-3" onSubmit={handleSubmit}>
                <h3>Add new user</h3>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    id="name"
                    value={newUser.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="age" className="form-label">
                    Age
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="age"
                    id="age"
                    value={newUser.age}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="career" className="form-label">
                    Career
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="career"
                    id="career"
                    value={newUser.career}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-2 text-end">
                  <button className="btn btn-dark">Add user</button>
                </div>
              </form>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 py-3">
              <table className="table table-dark table-striped ">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Age</th>
                    <th scope="col">Career</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <th scope="row">{users.indexOf(user) + 1}</th>
                      <td>{user.name}</td>
                      <td>{user.age}</td>
                      <td>{user.career}</td>
                      <td
                        style={{
                          display: "flex",
                          height: "100%",
                          padding: "1em",
                        }}
                      >
                        <button
                          className="btn btn-dark"
                          onClick={() => fill(user)}
                        >
                          <i className="bi bi-pen mx-3"></i>
                        </button>
                        <button
                          className="btn btn-dark"
                          onClick={() => deleteUser(user.id)}
                        >
                          <i className="bi bi-trash mx-3"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </React.Fragment>
  );
};

export default App;
