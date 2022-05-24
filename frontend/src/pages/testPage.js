import React, { useEffect, useState } from "react";
import {Table} from 'react-bootstrap';
import { Link, Route, useLocation } from "react-router-dom";
import Side_nav from "./side_nav";
import side_nav from "./side_nav";
import Header from "../header"
import LoginHeader from "../login-head";
const axios = require("axios");
const token = window.localStorage.getItem("token")

const tokenVal = window.localStorage.getItem("token")

function Manage_far() {

  const [users, setUsers] = useState([]);



  async function getUsers() {
    let response = await axios.get("http://localhost:4000/superadmin/showFarmers",{
      headers : {Authorization : token}
    });
    if (response.status === 200) {
      setUsers(response.data.response);
    } 
  }
  async function handleActivate(id) {
    const data ={
      userID:id
    }
    let response = await axios.post("http://localhost:4000/superadmin/reactivateUser",data,{
      headers : {Authorization : token}
    });
    if(response.status === 200){
        getUsers()

    }
  }

  async function handleDelete(id) {
    const data ={
      userID:id
    }
    let response = await axios.post("http://localhost:4000/superadmin/deleteUser",data,{
      headers : {Authorization : token}
    });
    if(response.status === 200){
        getUsers()

    }
  }

  useEffect(() => {
    getUsers();
  }, []);


  const data = {
    
  };
  return (
    <div>
      {tokenVal? <Header/>:<LoginHeader/>}
      {console.log(users)}
      <Side_nav/><div>
         <div
      className="modal fade"
      id="editHospitalModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
    </div>
      <div className="main__container" style={{marginLeft: "19rem",margintop: "2.5rem"}}>
  

      <Table striped bordered hover size="sm" >
  <thead>
    <tr>
      <th>Name</th>
      <th>UserName</th>
      <th>Email</th>
      <th>PhoneNumber</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
  {users&&users.length>0&&users.map((p)=>{
    return (
    <tr>
      <td>{p.name}</td>
      <td>{p.username}</td>
      <td>{p.email}</td>
      <td>{p.phNum}</td>
      <td>{p.status}</td>
      <td colSpan="2" ><button className="btn btn-success" data-toggle="modal" data-target="#exampleModal" onClick ={()=>handleActivate(p._id)}>Activate <i className="fa fa-edit"></i></button> 
       <button className="btn btn-danger" onClick ={()=>handleDelete(p._id)}><i className="fa fa-trash"></i></button></td>
    </tr>
       )})}

  </tbody>
</Table>
      </div>
  
    </div>
    </div>
  );
}

export default Manage_far;