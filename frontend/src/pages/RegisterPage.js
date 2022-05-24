import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Form,
  Button,
  InputGroup,
  FloatingLabel,
  Row,
  Col,
} from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { registerUser } from "../actions/userActions";
import "../styles/login-register.css";
import { ToastProvider, useToasts } from "react-toast-notifications";

const RegisterPage = ({ location, history }) => {
  //   const { addToast } = useToasts();
  const [typePassword, setTypePassword] = useState("password");
  const [typeConfirmPassword, setTypeConfirmPassword] = useState("password");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [mobileError, setMobileError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmpasswordError, setconfirmPasswordError] = useState(false);

  const redirect = location.search ? location.search.split("=")[1] : "";
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, userInfo, error } = userRegister;

  //Validation
  const validName = /^[a-zA-Z ]*$/;
  var emailChk =
    /^([a-z A-Z 0-9_\-\.])+\@([a-z A-Z 0-9_\-])+\.([a-z A-Z]{2,4}).$/;
  var phnoChk = /^([0-9_\-]{10,13})+$/;
  var userNameChk = /^(?=[a-zA-Z0-9._]{5,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
  var passwordChk =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const fullNameError = document.querySelector(".fullname .error");
  const fullEmailError = document.querySelector(".emailclass .error");
  const fullMobileError = document.querySelector(".mobile .error");
  const fullPasswordError = document.querySelector(".password .error");
  const fullcPasswordError = document.querySelector(".confirmpassword .error");
  const validateName = () => {
    if (validName.test(name)) {
      setNameError(false);
    } else if (name == "") {
      fullNameError.innerText = "Field cannot be blank";
      setNameError(true);
    } else {
      fullNameError.innerText = "Name should not contain numbers";
      setNameError(true);
    }
  };
  const validateEmail = () => {
    if (emailChk.test(email)) {
      setEmailError(false);
    } else if (email == "") {
      fullEmailError.innerText = "Field cannot be blank";
      setEmailError(true);
    } else {
      fullEmailError.innerText = "Invalid mail id";
      setEmailError(true);
    }
  };

  const validatePhNum = () => {
    if (phnoChk.test(number)) {
      setMobileError(false);
    } else if (number == "") {
      fullMobileError.innerText = "Field cannot be blank";
      setMobileError(true);
    } else {
      fullMobileError.innerText = "Invalid phone number";
      setMobileError(true);
    }
  };

  const validatePassword = () => {
    if (passwordChk.test(password)) {
      setPasswordError(false);
    } else if (password == "") {
      fullPasswordError.innerText = "Field cannot be blank";
      setPasswordError(true);
    } else {
      fullPasswordError.innerText = "Invalid Password";
      setPasswordError(true);
    }
  };

  const validateConfirmPassword = () => {
    if (confirmPassword == password) {
      setconfirmPasswordError(false);
    } else if (confirmPassword == "") {
      fullcPasswordError.innerText = "Field cannot be blank";
    } else {
      fullcPasswordError.innerText = "Password mismatch";
      setconfirmPasswordError(true);
    }
  };

  //   const validateName = () => {
  //     if (!validName.test(name)) {
  //       addToast("Name should not contain numbers", {
  //         appearance: "warning",
  //         autoDismiss: true,
  //       });
  //     }
  //   };
  //   const validateEmail = () => {
  //     if (!emailChk.test(email)) {
  //       addToast("Please enter a valid Email Address", {
  //         appearance: "warning",
  //         autoDismiss: true,
  //       });
  //     }
  //   };
  //   const validatePhNum = () => {
  //     if (!phnoChk.test(number)) {
  //       addToast("Please enter a valid Phone Number", {
  //         appearance: "warning",
  //         autoDismiss: true,
  //       });
  //     }
  //   };
  // //   const validateUserName = () => {
  // //     if (!userNameChk.test(username)) {
  // //       addToast(
  // //         "Username should be 5-20 characters long, No (_) or (.) should be there.",
  // //         { appearance: "warning", autoDismiss: true }
  // //       );
  // //     }
  // //   };
  //   const validatePassword = () => {
  //     if (!passwordChk.test(password)) {
  //       addToast(
  //         "Password should contain Minimum eight characters, at least one uppercase letter one lowercase letter, one number and one special character",
  //         { appearance: "warning", autoDismiss: true }
  //       );
  //     }
  //   };

  useEffect(() => {
    if (userInfo) {
      localStorage.setItem("promptEmailVerfication", "true");
      history.push(redirect);
    }
  }, [history, redirect, userInfo]);

  const showHidePassword = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setTypePassword(typePassword === "password" ? "text" : "password");
  };
  const showHideConfirmPassword = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setTypeConfirmPassword(
      typeConfirmPassword === "password" ? "text" : "password"
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      nameError == false &&
      mobileError == false &&
      passwordError == false 
      // emailError == false
    ) {
      if (password !== confirmPassword) {
        setMessage("Passwords do not match. Please retry.");
      } else {
        dispatch(registerUser(name, email, password, number));
      }
    } else {
      setMessage("Invalid Entry");
    }
  };

  return (
    <FormContainer>
      <div className="form-inner-container">
        <div className="form-heading">
          <h1 onClick={() => history.push("/login")}>Sign In</h1>
          <h1
            style={{
              background: "ghostwhite",
              boxShadow: "0px 0px 9px 0px rgba(0, 0, 0, 0.2)",
              WebkitBoxShadow: "0px 0px 9px 0px rgba(0, 0, 0, 0.2)",
              MozBoxShadow: "0px 0px 9px 0px rgba(0, 0, 0, 0.2)",
            }}
            onClick={() => history.push("/register")}
          >
            Sign Up
          </h1>
        </div>
        {message && (
          <Message dismissible variant="warning" duration={10}>
            {message}
          </Message>
        )}
        {error && (
          <Message dismissible variant="danger" duration={10}>
            {error}
          </Message>
        )}
        {loading ? (
          <Loader />
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name" className="mb-2">
              <FloatingLabel
                controlId="nameinput"
                label="Name"
                className="fullname mb-3"
              >
                <Form.Control
                  size="lg"
                  placeholder="Enter Name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyUp={() => validateName()}
                />
                <div
                  className={
                    nameError ? "error error-visible " : "error error-hidden"
                  }
                ></div>
              </FloatingLabel>
            </Form.Group>
            <Form.Group controlId="name" className="mb-2">
              <FloatingLabel
                controlId="numberinput"
                label="Phone Number"
                className="mobile mb-3"
              >
                <Form.Control
                  size="lg"
                  placeholder="Enter Your Phone Number"
                  type="text"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  onKeyUp={() => validatePhNum()}
                />
                <div
                  className={
                    mobileError ? "error error-visible " : "error error-hidden"
                  }
                ></div>
              </FloatingLabel>
            </Form.Group>
            <Form.Group controlId="email" className="my-2">
              <FloatingLabel
                controlId="emailinput"
                label="Email Address"
                className="emailclass mb-3"
              >
                <Form.Control
                  size="lg"
                  placeholder="Enter Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyUp={() => validateEmail()}
                />
                <div
                  className={
                    emailError ? "error error-visible " : "error error-hidden"
                  }
                ></div>
              </FloatingLabel>
            </Form.Group>
            <Form.Group>
              <InputGroup>
                <FloatingLabel
                  controlId="passwordinput"
                  label="Password"
                  style={{
                    display: "flex",
                    width: "100%",
                  }}
                  className="password mb-3"
                >
                  <Form.Control
                    size="lg"
                    type={typePassword}
                    placeholder="Enter your password"
                    value={password}
                    style={{
                      borderRight: "none",
                    }}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyUp={() => validatePassword()}
                  />
                  <div className="input-group-append">
                    <InputGroup.Text
                      onClick={showHidePassword}
                      style={{
                        fontSize: "1rem",
                        height: "100%",
                        marginLeft: "-0.5em",
                        background: "transparent",
                        borderLeft: "none",
                      }}
                    >
                      {typePassword === "text" ? (
                        <i className="far fa-eye-slash" />
                      ) : (
                        <i className="far fa-eye" />
                      )}
                    </InputGroup.Text>
                  </div>
                  <div
                    className={
                      passwordError
                        ? "error error-visible "
                        : "error error-hidden"
                    }
                  ></div>
                </FloatingLabel>
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <InputGroup>
                <FloatingLabel
                  controlId="confirmpasswordinput"
                  label="Confirm password"
                  style={{ display: "flex", width: "100%" }}
                  className="mb-3"
                >
                  <Form.Control
                    size="lg"
                    type={typeConfirmPassword}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    style={{
                      borderRight: "none",
                    }}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <div className="input-group-append">
                    <InputGroup.Text
                      onClick={showHideConfirmPassword}
                      style={{
                        fontSize: "1rem",
                        height: "100%",
                        marginLeft: "-0.5em",
                        background: "transparent",
                        borderLeft: "none",
                      }}
                    >
                      {typeConfirmPassword === "text" ? (
                        <i className="far fa-eye-slash" />
                      ) : (
                        <i className="far fa-eye" />
                      )}
                    </InputGroup.Text>
                  </div>
                  <div
                    className={
                      confirmpasswordError
                        ? "error error-visible "
                        : "error error-hidden"
                    }
                  ></div>
                </FloatingLabel>
              </InputGroup>
            </Form.Group>
            <Row>
              <Col
                style={{
                  display: "flex",
                }}
              >
                <Button
                  type="submit"
                  className="ms-auto"
                  style={{
                    padding: "0.5em 1em",
                    width: "8rem",
                  }}
                >
                  Register
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </div>
    </FormContainer>
  );
};

export default RegisterPage;
