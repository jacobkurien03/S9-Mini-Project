import React, {useState} from "react";
import "./changePassword.css";
import { useHistory } from "react-router-dom";

const axios = require("axios");

const ChangePassword = () => {
  let history = useHistory();
  const fullMobileError = document.querySelector(".mobile .error");
  const verifyInput = document.querySelector(".verifyotpform-holder");
  const regSubBtn = document.querySelector("#reg-btn");
  const [phNum, setPhNum] = useState(null);
  const [otpcode, setOtpCode] = useState();
  const [sendOtpcode, setSendOtpCode] = useState("Send Otp");
  const [otpError, setOtpError] = useState(true);
  const [mobileError, setMobileError] = useState();

  const validPhone = /^([0-9_\-]{10})+$/;
  const validOtp = /^([0-9_\-]{6})+$/;

  const validateMobile = () => {
    if (validPhone.test(phNum)) {
      setMobileError(false);
    } else if (phNum == "") {
      fullMobileError.innerText = "Field cannot be blank";
      setMobileError(true);
    } else {
      fullMobileError.innerText = "Invalid phone number";
      setMobileError(true);
    }
  };

  const validateOtp = () => {
    if (validOtp.test(otpcode)) {
      setOtpError(false);
    } else if (otpcode === "") {
      setOtpError(true);
    } else {
      setOtpError(true);
    }
  };

  const buttonCursor = document.querySelector(".button"); //To avoid poniterevent and cursor problem
  const submitval = () => {
    console.log(otpError);
    if (otpError === false) {
      regSubBtn.classList.remove("disabled");
      buttonCursor.classList.remove("cursor-disabled");
    } else {
      regSubBtn.classList.add("disabled");
      buttonCursor.classList.add("cursor-disabled");
    }
  };

  //===================API CALLING=====================//

  const sendOtp = async () => {
    const data = {
      phNum: phNum,
    };
    try {
      await axios
        .post("/otpAuthentication", data)
        .then((res) => {
          if (res.status == 200) {
            setSendOtpCode("Resend");
            verifyInput.classList.remove("hidden-mob");
          } else {
            verifyInput.classList.add("hidden-mob");
            console.log(res.data.message);
          }
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  const verifyOtp = async () => {
    const data = {
      otpcode: otpcode,
    };
    const res = await axios.post("/otpAuthentication", data);
    if (res.status === 200) {
      console.log(res);
    } else {
      console.log(res.data.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      phNum: phNum,
    };
    const response = await axios.post("http://localhost:4000/api/sendPhVerify", data);
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
         Please Enter your valid Phone Number. Confirmation Mail will be sent your mail Address.<br/>
          Please click that link to proceed to change Password.</div>
      </div>
      <div className="d-flex flex-column mx-auto my-auto justify-content-center">
      <form action="" id="reg-form" onKeyUp={submitval}>
      <div className="card">
          <div className="register-text mb-4">Enter Your Email Address</div>
          <label classname="email-label mt-4 mb-4">PhoneNumber</label>
          <input type="text" className="form-control" id="exampleInputEmail1" onChange={(e) => setPhNum(e.target.value)}onKeyUp = {validateMobile}/>
          <div
                className={
                  mobileError ? "error error-visible " : "error error-hidden"
                }
              ></div>
            </div>
          <button type="button" className="btn mt-4" onClick={(e) => sendOtp()} >
            Send Confirmation
          </button>
          <div className="verifyotpform-holder mobile hidden-mob">
            <span className="lnr lnr-phone-handset"></span>
            <input
              type="text"
              className="otpform-control "
              value={otpcode}
              placeholder="Otp Code"
              onChange={(e) => setOtpCode(e.target.value)}
              onKeyUp={validateOtp}
            />
            <div
              className={
                mobileError ? "error error-visible " : "error error-hidden"
              }
            ></div>
          </div>
          <div className="button cursor-disable">
            <input
              type="button"
              value="Register"
              id="reg-btn"
              class="btn1 primary-button disabled"
            ></input>
          </div>
      </form>
        </div>
      </div>
  );
};

export default ChangePassword;
