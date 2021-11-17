import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";
import { ReactComponent as Loginimg } from "../assets/Group409.svg";

const axios = require("axios");
const Register = () => {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [phNum, setPhNum] = useState(null);
  const [reEnterPass, setReEnterPass] = useState(null);
  const [nameError, setNameError] = useState(false);
  const [userNameError, setUserNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phNoError, setphNoError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [reEnterPasswordError, setreEnterPasswordError] = useState(false);

  const validName = /^[a-zA-Z]+$/;
  var emailChk =
    /^([a-z A-Z 0-9_\-\.])+\@([a-z A-Z 0-9_\-])+\.([a-z A-Z]{2,4}).$/;
  var phnoChk = /^([0-9_\-]{10,13})+$/;
  var userNameChk = /^(?=[a-zA-Z0-9._]{5,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
  var passwordChk =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const validateName = () => {
    if (!validName.test(firstName)) {
      setNameError(true);
    } else {
      setNameError(false);
    }
  };
  const validateEmail = () => {
    if (!emailChk.test(email)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };
  const validatePhNum = () => {
    if (!phnoChk.test(phNum)) {
      setphNoError(true);
    } else {
      setphNoError(false);
    }
  };
  const validateUserName = () => {
    if (!userNameChk.test(username)) {
      setUserNameError(true);
    } else {
      setUserNameError(false);
    }
  };
  const validatePassword = () => {
    if (!passwordChk.test(password)) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
      setreEnterPasswordError(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let name = firstName + lastName;
    const data = {
      name: name,
      email: email,
      phNum: phNum,
      username: username,
      password: password,
    };
    if (password === reEnterPass) {
      const response = await axios.post(
        "http://localhost:4000/api/register",
        data
      );
      alert(response.data.message);
    } else {
      alert("Password Mismatch");
    }
  };

  return (
    <div
      style={{ position: "fixed" }}
      className="d-flex flex-row min-vh-100 min-vw-100"
    >
      <div className="d-flex flex-column mt-3">
        <div className="container-1">
          <h1>Jacob's Shopping</h1>
        </div>
        <div className="container-2">
          1. Username should be 5-20 characters long, No (_) or (.) should be
          there.
          <br />
          2. Password should contain Minimum eight characters, at least one
          uppercase letter,
          <br />
          one lowercase letter, one number and one special character
        </div>
        <Loginimg className="img-container" />
      </div>
      <form
        className="d-flex flex-column mx-auto"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="card">
          <div className="cardRegister">
            <div className="register-text mb-4">Register</div>
            <label className="email-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              onChange={(e) => setUsername(e.target.value)}
              onKeyUp={validateUserName}
            />
            <div className="d-flex flex-column mb-4">
              <div
                className={
                  userNameError ? "error error-visible " : "error error-hidden"
                }
              >
                <p>Please Enter a valid Username</p>
              </div>
            </div>
            <div className="d-flex flex-row">
              <div className="d-flex flex-column">
                <label className="email-label">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  onChange={(e) => setFirstName(e.target.value)}
                  onKeyUp={validateName}
                />
                <div className="d-flex flex-column mb-4">
                  <div
                    className={
                      nameError ? "error error-visible " : "error error-hidden"
                    }
                  >
                    <p>Name should not contain numbers</p>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column">
                <label className="email-label">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  onChange={(e) => setLastName(e.target.value)}
                  onKeyUp={validateName}
                />
              </div>
            </div>
            <label className="email-label">Ph Num:</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              onChange={(e) => setPhNum(e.target.value)}
              onKeyUp={validatePhNum}
            />
            <div className="d-flex flex-column mb-4">
              <div
                className={
                  phNoError ? "error error-visible " : "error error-hidden"
                }
              >
                <p>Enter valid Phone Number</p>
              </div>
            </div>
            <label className="email-label">Email</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              onChange={(e) => setEmail(e.target.value)}
              onKeyUp={validateEmail}
            />
            <div className="d-flex flex-column mb-4">
              <div
                className={
                  emailError ? "error error-visible " : "error error-hidden"
                }
              >
                <p>Enter valid Email Address</p>
              </div>
            </div>
            <label className="email-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(e) => setPassword(e.target.value)}
              onKeyUp={validatePassword}
            />
            <div className="d-flex flex-column mb-4">
              <div
                className={
                  passwordError ? "error error-visible " : "error error-hidden"
                }
              >
                <p>Enter a valid Password</p>
              </div>
            </div>
            <label className="email-label">ReEnterPassword</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(e) => setReEnterPass(e.target.value)}
            />
            <div
              className={
                reEnterPasswordError
                  ? "error error-visible "
                  : "error error-hidden"
              }
            >
              <p>Password Does Not Match</p>
            </div>
            <button type="submit" className="btn">
              Register
            </button>
            <label className="noacc">
              Have an account?
              <Link to="/" className="register-link">
                LogIn
              </Link>
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
