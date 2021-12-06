import React, { Fragment,useState,useEffect } from "react";
import MetaTags from "react-meta-tags";
import LayoutSuperAdmin from "../../layouts/LayoutSuperAdmin";
import ShowUsers from "../../components/users/showUsers" 
import "./users.css";
import {Table} from 'react-bootstrap';
import { Link, Route, useLocation } from "react-router-dom";
const axios = require('axios')

const Admin = () => {
  const [users, setUsers] = useState([]);
  const token = window.localStorage.getItem("token");

  async function getUsers() {
    let response = await axios.get("http://localhost:4000/superadmin/showUsers",{
      headers: { Authorization: token },
    });
    if (response.status === 200) {
      setUsers(response.data.response);
    }
  }

  useEffect(() => {
    getUsers();
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
         <div
      className="modal fade"
      id="editHospitalModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div class="container">
          <div class="card">
            <div class="info">
              {" "}
              <span>Edit Hospital</span> <button id="savebutton">edit</button>{" "}
            </div>
            <div class="forms">
              <div class="inputs">
                <span>Name</span> <input type="text" />
              </div>
              <div class="inputs">
                <span>Email</span> <input type="Email" />
              </div>
              <div class="inputs">
                <span>Username</span>
                <input type="tel" minLength="10" maxLength="10" />
              </div>
              <div class="inputs">
                <span>Role</span> <input type="text" />
              </div>

              <div class="inputs">
                <span>Status</span> <input type="text" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      <div className="main__container">
      <Link to="/addhospital">
                <button className="btn btn-primary">Add Hospital</button>
              </Link>


      <Table striped bordered hover size="sm">
  <thead>
    <tr>
      <th>#</th>
      <th>Name</th>
      <th>Email</th>
      <th>Username</th>
      <th>Role</th>
      <th>Status</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {console.log(users)}
  {users&&users.length>0&&users.map((p)=>{
    return (
    <tr>
      <td>{p._id}</td>
      <td>{p.name}</td>
      <td>{p.email}</td>
      <td>{p.username}</td>
      <td>{p.role}</td>
      <td>{p.status}</td>
      <td colSpan="2" ><button className="btn btn-success" data-toggle="modal" data-target="#exampleModal">Edit  <i className="fa fa-edit"></i></button> 
       <button className="btn btn-danger"><i className="fa fa-trash"></i></button></td>
    </tr>
       )})}

  </tbody>
</Table>
      </div>
  
    </main>
      </LayoutSuperAdmin>
    </Fragment>
  );
};

export default Admin;
