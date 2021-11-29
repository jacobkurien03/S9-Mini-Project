import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import MetaTags from "react-meta-tags";
import { Link, useHistory } from "react-router-dom";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { isUserAuthenticated } from "../../helpers/authUtils";

const axios = require("axios");

const LoginRegister = ({ location }) => {
  const [loginUserName, setLoginUsername] = useState(null);
  const [loginPassword, setLoginPassword] = useState(null);
  const { pathname } = location;
  let history = useHistory();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username: loginUserName,
      password: loginPassword,
    };
    const response = await axios.post("http://localhost:4000/api/login", data);
    if (response.data.status === "200") {
      //setToken(response.data.token);
      const isAuthTokenValid = isUserAuthenticated();
        if (isAuthTokenValid) {
          history.push("/");
        }
      
    } else {
      alert(response.data.message);
    }
  };

  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [phNum, setPhNum] = useState(null);
  const [reEnterPass, setReEnterPass] = useState(null);
  const [nameError, setNameError] = useState(false);
  const [nameError1, setNameError1] = useState(false);
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
  const validateName1 = () => {
    if (!validName.test(lastName)) {
      setNameError1(true);
    } else {
      setNameError1(false);
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
    if (!passwordChk.test(loginPassword)) {
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
      username: loginUserName,
      password: loginPassword,
    };
    if (loginPassword === reEnterPass) {
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
    <Fragment>
      <MetaTags>
        <title>Amazing | Login</title>
        <meta
          name="description"
          content="Compare page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Login Register
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="login">
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link eventKey="login">
                          <h4>Login</h4>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="register">
                          <h4>Register</h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="login">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form>
                              <input
                                type="text"
                                name="user-name"
                                placeholder="Username"
                                onChange={(e) =>
                                  setLoginUsername(e.target.value)
                                }
                              />
                              <input
                                type="password"
                                name="user-password"
                                placeholder="Password"
                                onChange={(e) =>
                                  setLoginPassword(e.target.value)
                                }
                              />
                              <div className="button-box">
                                <div className="login-toggle-btn">
                                  <input type="checkbox" />
                                  <label className="ml-10">Remember me</label>
                                  <Link to={process.env.PUBLIC_URL + "/"}>
                                    Forgot Password?
                                  </Link>
                                </div>
                                <button
                                  type="button"
                                  onClick={(e) => handleLoginSubmit(e)}
                                >
                                  <span>Login</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="register">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form>
                              <input
                                type="text"
                                name="first-name"
                                placeholder="Firstname"
                                onChange={(e) => setFirstName(e.target.value)}
                                onKeyUp={validateName}
                              />
                              <div className="d-flex flex-column mb-4">
                                <div
                                  className={
                                    nameError
                                      ? "error error-visible "
                                      : "error error-hidden"
                                  }
                                >
                                  <p>Name should not contain numbers</p>
                                </div>
                              </div>
                              <input
                                type="text"
                                name="last-name"
                                placeholder="Lastname"
                                onChange={(e) => setLastName(e.target.value)}
                                onKeyUp={validateName1}
                              />
                              <div className="d-flex flex-column mb-4">
                                <div
                                  className={
                                    nameError1
                                      ? "error error-visible "
                                      : "error error-hidden"
                                  }
                                >
                                  <p>Name should not contain numbers</p>
                                </div>
                              </div>
                              <input
                                type="text"
                                name="user-name"
                                placeholder="Username"
                                onChange={(e) => setUsername(e.target.value)}
                                onKeyUp={validateUserName}
                              />
                              <div className="d-flex flex-column mb-4">
                                <div
                                  className={
                                    userNameError
                                      ? "error error-visible "
                                      : "error error-hidden"
                                  }
                                >
                                  <p>Please Enter a valid Username</p>
                                </div>
                              </div>
                              <input
                                type="text"
                                name="phone-number"
                                placeholder="Phone Number"
                                onChange={(e) => setPhNum(e.target.value)}
                                onKeyUp={validatePhNum}
                              />
                              <div className="d-flex flex-column mb-4">
                                <div
                                  className={
                                    phNoError
                                      ? "error error-visible "
                                      : "error error-hidden"
                                  }
                                >
                                  <p>Enter valid Phone Number</p>
                                </div>
                              </div>
                              <input
                                type="password"
                                name="user-password"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyUp={validatePassword}
                              />
                              <div className="d-flex flex-column mb-4">
                                <div
                                  className={
                                    passwordError
                                      ? "error error-visible "
                                      : "error error-hidden"
                                  }
                                >
                                  <p>Enter a valid Password</p>
                                </div>
                              </div>
                              <input
                                type="password"
                                name="user-reenterpassword"
                                placeholder="Re-Enter Password"
                                onChange={(e) => setReEnterPass(e.target.value)}
                              />
                              <input
                                name="user-email"
                                placeholder="Email"
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                onKeyUp={validateEmail}
                              />
                              <div className="d-flex flex-column mb-4">
                                <div
                                  className={
                                    emailError
                                      ? "error error-visible "
                                      : "error error-hidden"
                                  }
                                >
                                  <p>Enter valid Email Address</p>
                                </div>
                              </div>
                              <div className="button-box">
                                <button
                                  type="button"
                                  onClick={(e) => handleSubmit(e)}
                                >
                                  <span>Register</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

LoginRegister.propTypes = {
  location: PropTypes.object,
};

export default LoginRegister;
