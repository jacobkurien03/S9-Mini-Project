import React, { Fragment, useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import LayoutSuperAdmin from "../../layouts/LayoutSuperAdmin";
import "./users.css";
import { Table } from "react-bootstrap";
import { Link, Route, useLocation } from "react-router-dom";
const axios = require("axios");

const Users = () => {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(null);
  const [count, setCount] = useState([1]);
  const token = window.localStorage.getItem("token");

  async function getHospitals() {
    let response = await axios.get(
      "http://localhost:4000/superadmin/showUsers",
      {
        headers: { Authorization: token },
      }
    );
    if (response.status === 200) {
      setUsers(response.data.response);
    }
  }
  async function deleteUser(e,id) {
    e.preventDefault()
    let data = {
      userID: id,
    };
    let response = await axios.post(
      "http://localhost:4000/superadmin/deleteUser",
      data,
      {
        headers: { Authorization: token },
      }
    );
  }
  async function reActivateUser(e,id) {
    e.preventDefault()
    let data = {
      userID: id,
    };
    let response = await axios.post(
      "http://localhost:4000/superadmin/reactivateUser",
      data,
      {
        headers: { Authorization: token },
      }
    );
  }

  useEffect(() => {
    getHospitals();
  }, []);
  return (
    <Fragment>
      <MetaTags>
        <title>Admin | Users</title>
        <meta name="description" content="Admin home page." />
      </MetaTags>
      <LayoutSuperAdmin
        headerContainerClass="container-fluid"
        headerPaddingClass="header-padding-1"
      >
        <main>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Username</th>
                <th>Role</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.length > 0 &&
                users.map((p) => {
                  return (
                    <tr>
                      <td>{p.name}</td>
                      <td>{p.email}</td>
                      <td>{p.username}</td>
                      <td>{p.role}</td>
                      <td>{p.status}</td>
                      <td colSpan="2">
                        <button
                          className="btn btn-success"
                          data-toggle="modal"
                          data-target="#exampleModal"
                          onClick={(e)=>reActivateUser(e,p._id)}
                        >
                          Activate
                        </button>
                        <button className="btn btn-danger" onClick={(e)=>deleteUser(e,p._id)}>
                          DeActivate
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </main>
      </LayoutSuperAdmin>
    </Fragment>
  );
};

export default Users;
