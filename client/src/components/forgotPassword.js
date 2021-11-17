import React, {useState} from "react";
import "./changePassword.css";
import { useHistory } from "react-router-dom";

const axios = require("axios");

const ChangePassword = () => {
  const [email, setEmail] = useState(null);
  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: email,
    };
    const response = await axios.post("http://localhost:4000/api/sendEmailVerify", data);
    if (response.data.status === "200") {
    history.push("/");
    } else {
    alert(response.data.message);
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
        <div className="container-2">Don't worry we are here to help you.<br/>
         Please Enter your valid Email address. Confirmation Mail will be sent your mail Address.<br/>
          Please click that link to proceed to change Password.</div>
      </div>
      <div className="d-flex flex-column mx-auto my-auto justify-content-center">
        <div className="card">
          <div className="register-text mb-4">Enter Your Email Address</div>
          <label classname="email-label mt-4 mb-4">Email</label>
          <input type="text" className="form-control" id="exampleInputEmail1" onChange={(e) => setEmail(e.target.value)}/>
          <button type="button" className="btn mt-4" onClick={(e) => handleSubmit(e)}>
            Send Confirmation
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
