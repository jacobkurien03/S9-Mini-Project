import React, { useState } from "react";
import "./login.css";
import { ReactComponent as Loginimg } from "../assets/Group409.svg";
import { ReactComponent as Googleimg } from "../assets/google.svg";
import { ReactComponent as Facebookimg } from "../assets/facebook.svg";
import { Link, useHistory } from "react-router-dom";

const axios = require("axios");
const Login = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username: username,
      password: password,
    };
    const response = await axios.post("http://localhost:4000/api/login", data);
    if (response.data.status === "200") {
      history.push("/home");
    } else {
      alert(response.data.message);
    }
  };
  return (
    <div
      style={{ position: "fixed" }}
      className="d-flex flex-row min-vh-100 min-vw-100"
    >
      <div className="d-flex flex-column mt-5">
        <div className="container-1">
          <h1>Jacob's Shopping</h1>
        </div>
        <div className="container-2">Hello how are you</div>
        <Loginimg className="img-container" />
      </div>
      <form
        className="d-flex flex-column mx-auto"
      >
        <div className="card">
          <div className="register-text mb-4">Login</div>
          <label classname="email-label">Email</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label classname="email-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="d-flex flex-row">
            <div className="d-flex flex-column">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  defaultValue
                  id="flexCheckDefault"
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  Remember Me?
                </label>
              </div>
            </div>
            <div className="login-forgot">
              <div className="form-check">
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  <Link to="/forgotPassword" class="form-check-label">
                    Forgot Password?
                  </Link>
                </label>
              </div>
            </div>
          </div>
          <button type="button" className="btn" onClick={(e) => handleSubmit(e)}>
            Login
          </button>
          <label className="noacc">
            Don't have an account?
            <Link to="/register" className="register-link">
              Register
            </Link>
          </label>
          <div className="line">
            <div className="line-1"></div>
            <div className="line-text">or Login with</div>
            <div className="line-1"></div>
          </div>

          <div className="or-buttons">
            <button className="google-button">
              <Googleimg></Googleimg>
            </button>
            <button className="facebook-button">
              <Facebookimg></Facebookimg>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
