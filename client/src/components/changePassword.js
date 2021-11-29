import React, { useState } from "react";
import "./changePassword.css";
import { useHistory } from "react-router-dom";

const axios = require("axios");

const ChangePassword = () => {
  const [password, setNewPassword] = useState(null);
  const [passwordCh, setReEnter] = useState(null);
  let history = useHistory();

  if (document.cookie) {
    console.log(document.cookie);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      password: password,
    };
    if (password === passwordCh) {
      const response = await axios.post(
        "http://localhost:4000/api/changePass",
        data
      );
      if (response.data.status === "200") {
        history.push("/");
      } else {
        alert(response.data.message);
      }
    } else {
      alert("Password Mismatch");
    }
  };
  return (
    <div
      style={{ position: "fixed" }}
      className="d-flex flex-row min-vh-100 min-vw-100"
    >
      <div className="d-flex flex-column mx-auto my-auto justify-content-center">
        <div className="container-1">
          <h1>Forgot Password?</h1>
        </div>
        <div className="container-2">Don't worry we are here to help you.</div>
      </div>
      <div className="d-flex flex-column mx-auto my-auto justify-content-center">
        <div className="card">
          <div className="register-text mb-4">ChangePassword</div>
          <label classname="email-label mt-4 mb-4">New Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputEmail1"
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <label classname="email-label mt-4 mb-4">Re-Enter Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputEmail1"
            onChange={(e) => setReEnter(e.target.value)}
          />
          <button
            type="button"
            className="btn mt-4"
            onClick={(e) => handleSubmit(e)}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
