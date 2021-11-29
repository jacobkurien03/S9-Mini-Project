Rubin Mon Wp, [17-11-2021 21:30]
import React, { useState } from "react";
import axios from "../../../axios";
import "./OtpAuthentication.css";
function OtpAuthentication() {
  

  //===================API CALLING=====================//

Rubin Mon Wp, [17-11-2021 21:30]
return (
    <div className="wrapper">
      <div className="img1">
        {" "}
        {/* <img src={image1} alt="" class="image-1" /> */}
      </div>
      <div className="inner">
        <form action="" id="reg-form" onKeyUp={submitval}>
          <h3>Verify</h3>
          <div className="mobileinput">
            <div className="otpform-holder mobile">
              <span className="lnr lnr-phone-handset"></span>
              <input
                type="text"
                className="otpform-control"
                value={mobile}
                placeholder="Phone Number"
                onChange={(e) => setMobile(e.target.value)}
                onKeyUp={validateMobile}
              />
              <div
                className={
                  mobileError ? "error error-visible " : "error error-hidden"
                }
              ></div>
            </div>
            <div className="button">
              <input
                type="button"
                value={sendOtpcode}
                id="Otpbtn"
                class="btn1 "
                onClick={sendOtp}
              ></input>
            </div>
          </div>
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
}

export default OtpAuthentication;

Rubin Mon Wp, [17-11-2021 21:42]
D:\College\Project\Mini-Project\Server\APP\AUTHENTICATION\otpAuthentication.js

Rubin Mon Wp, [17-11-2021 21:42]
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const dotenv = require("dotenv");
dotenv.config();

const client = require("twilio")(accountSid, authToken);

module.exports = {
  otpAuthentication: (mobno) => {
    return new Promise(async (resolve, reject) => {
      let register_status = false;
      let response = {};
      const mobilenumber = +${91} + mobno;
      if (isNaN(mobno) || mobno.length != 10) {
        console.log("hello00000");
        register_status = false;
        resolve({ register_status });
      } else {
        client.verify
          .services(process.env.service_id)
          .verifications.create({
            to: mobilenumber,
            channel: "sms",
          })
          .then((status) => {
            if (status) {
              response.register_status = true;
              resolve(response);
            }
          })
          .catch((err) => console.log("error", err));
      }
    });
  },
  otpVerification: (otpcode, mobileNO) => {
    try {
      return new Promise(async (resolve, reject) => {
        client.verify
          .services(process.env.service_id)
          .verificationChecks.create({
            to: mobileNO,
            code: otpcode,
          })
          .then(async (response) => {
            if (response.status == "approved") {
              response.register_status = true;
              resolve(response);
            } else {
              response.register_status = false;
              resolve(response);
            }
          })
          .catch((err) => console.log("error", err));
      });
    } catch (error) {
      console.log("some error occured");
    }
  },
};

Rubin Mon Wp, [17-11-2021 21:42]
router.post("/otpAuthentication", async (req, res, next) => {
  otpAuthentication.otpAuthentication(req.body.mobile).then((response) => {
    if (response.register_status) {
      res.status(200).json({ message: "otp sended" });
    } else {
      res.status(401).json({ message: "some error occured" });
    }
  });
});

Rubin Mon Wp, [17-11-2021 21:43]
@font-face {
  font-family: "Muli-Regular";
  src: url("../../../Assets/fonts/muli/Muli-Regular.ttf");
}
@font-face {
  font-family: "Muli-SemiBold";
  src: url("../../../Assets/fonts/muli/Muli-SemiBold.ttf");
}
* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

body {
  font-family: "Muli-Regular";
  font-size: 14px;
  margin: 0;
  color: #999;
}

input,
textarea,
select,
button {
  font-family: "Muli-Regular";
}

p,
h1,
h2,
h3,
h4,
h5,
h6,
ul {
  margin: 0;
}

img {
  max-width: 100%;
}

ul {
  padding-left: 0;
  margin-bottom: 0;
}

a {
  text-decoration: none;
}

:focus {
  outline: none;
}

.wrapper {
  height: 100vh;
  display: flex;
  padding: 0 30px 30px 0;
  align-items: center;
  justify-content: center;
  background: rgb(240, 232, 232);
}

.inner {
  position: relative;
  width: 600px;
}

.image-1 {
  height: auto;
  width: 200px;
}
.img1 {
  flex: 1;
}

form {
  flex: 1;
  width: 100%;
  position: relative;
  z-index: 9;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  padding: 50px 61px 50px;
  background: #fff;
  box-shadow: 10px 20px 28px rgba(0, 0, 0, 0.445);
  border-radius: 10px;
}

h3 {
  text-transform: uppercase;
  font-size: 25px;
  font-family: "Muli-SemiBold";
  color: #333;
  letter-spacing: 3px;
  text-align: center;
  margin-bottom: 33px;
}

.otpform-holder {
  position: relative;
}

.otpform-holder span {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  font-size: 15px;
  color: #333;
}

.mobileinput {
  display: flex;
  column-gap: 20px;
  justify-content: space-between;
}

.otpform-holder span.lnr-lock {
  left: 2px;
}
.verifyotpform-holder {
  position: relative;
}
.verifyotpform-holder {
  position: relative;
}

.verifyotpform-holder span {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  font-size: 15px;
  color: #333;
}
.verifyotpform-holder span.lnr-lock {
  left: 2px;
}

.otpform-control {
  border: none;
  border-bottom: 1px solid #e6e6e6;
  display: block;
  width: 300px;
  height: 38px;
  background: none;
  padding: 3px 42px 0px;
  color: #666;
  font-family: "Muli-SemiBold";
  font-size: 16px;
}
.otpform-control::-webkit-input-placeholder {
  font-size: 14px;
  font-family: "Muli-Regular";
  color: #999;
  transform: translateY(1px);
}
.otpform-control::-moz-placeholder {
  font-size: 14px;
  font-family: "Muli-Regular";
  color: #999;
  transform: translateY(1px);
}
.otpform-control:-ms-input-placeholder {
  font-size: 14px;
  font-family: "Muli-Regular";
  color: #999;
  transform: translateY(1px);
}
.otpform-control:-moz-placeholder {
  font-size: 14px;
  font-family: "Muli-Regular";
  color: #999;
  transform: translateY(1px);
}
.otpform-control:focus {
  border-bottom: 1px solid #accffe;
}

/* button {
    border: none;
    width: 100%;
    height: 49px;
    margin-top: 50px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    background: #99ccff;
    color: #fff;
    text-transform: uppercase;
    font-family: "Muli-SemiBold";
    font-size: 15px;
    letter-spacing: 2px;
    transition: all 0.5s;
    position: relative;
    overflow: hidden;
  }
  button span {
    position: relative;
    z-index: 2;
  }
  button:before,
  button:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: rgba(52, 152, 253, 0.25);
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    -o-transition: all 0.3s;
    transition: all 0.3s;
    -webkit-transform: translate(-100%, 0);
    transform: translate(-100%, 0);
    -webkit-transition-timing-function: cubic-bezier(0.75, 0, 0.125, 1);
    transition-timing-function: cubic-bezier(0.75, 0, 0.125, 1);
  }
  button:after {
    -webkit-transition-delay: 0.2s;
    transition-delay: 0.2s;
  }
  button:hover:before,
  button:hover:after {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  } */

Rubin Mon Wp, [17-11-2021 21:43]
.btn1 {
  font-size: 1.3541666666666667vw;
  color: #fff;
  padding: 0.5208333333333334vw 2.0833333333333335vw;
  border: none;
  width: 100%;
  outline: none;
  cursor: pointer;
  user-select: none;
  font-family: "NunitoSB";
  background: #51bde4;
  box-shadow: 0px 8px 16px rgba(71, 151, 255, 0.16);
  border-radius: 7px;
  transition: 0.2s;
}
.btn1:active {
  transform: scale(0.97);
  box-shadow: none;
}

@media (max-width: 991px) {
  .inner {
    width: 400px;
    left: 4%;
  }
}
@media (max-width: 767px) {
  .inner {
    width: 100%;
    left: 0;
  }

  .image-1,
  .image-2 {
    display: none;
  }
  .checkmark__circle {
    stroke-dasharray: 166;
    stroke-dashoffset: 166;
    stroke-width: 2;
    stroke-miterlimit: 10;
    stroke: #7ac142;
    fill: none;
    animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
  }
  
  .checkmark {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    display: block;
    stroke-width: 2;
    stroke: #fff;
    stroke-miterlimit: 10;
    margin: 10% auto;
    box-shadow: inset 0px 0px 0px #7ac142;
    animation: fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both;
  }
  
  .checkmark__check {
    transform-origin: 50% 50%;
    stroke-dasharray: 48;
    stroke-dashoffset: 48;
    animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
  }
  
  @keyframes stroke {
    100% {
      stroke-dashoffset: 0;
    }
  }
  @keyframes scale {
    0%, 100% {
      transform: none;
    }
    50% {
      transform: scale3d(1.1, 1.1, 1);
    }
  }
  @keyframes fill {
    100% {
      box-shadow: inset 0px 0px 0px 30px #7ac142;
    }
  }

  form {
    padding: 35px;
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    -ms-box-shadow: none;
    -o-box-shadow: none;
  }

  .wrapper {
    background: none;
  }
}
.error {
  position: absolute;

  color: #ec0000;
  font-family: "Gilroy_M";
  font-size: 14px;
}

/* Error Visibility */

.error-visible {
  visibility: visible;
}
.error-hidden {
  visibility: hidden;
}

/* isabled Button Style */
.disabled {
  opacity: 40%;
  pointer-events: none;
}
.cursor-disable {
  cursor: not-allowed;
}

.hidden-mob {
  visibility: hidden;
  display: none;
}
.vissible-mob {
  display: block;
}
.hidden-btn{
    visibility: hidden;
    display: none;
  }
  .hidden-btn {
    display: block;
  }