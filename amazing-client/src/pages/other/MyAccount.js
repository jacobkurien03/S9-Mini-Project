import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import AddressCollection from "../../components/AddressCollection"
import axios from "axios";

const MyAccount = ({ location }) => {
  const [userDetails, setUserDetails] = useState([]);
  const [currentPassword, setCurrentPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [count, setCount] = useState([0]);
  const token = window.localStorage.getItem("token");
  async function getDetails() {
    let response = await axios.get(
      "http://localhost:4000/user/showDetails",
      {
        headers: { Authorization: token },
      }
    );
    setUserDetails(response.data.response);
  }
  const handleChangePassword = async (e) => {
    e.preventDefault();
    const data = {
      oldPassword : currentPassword,
      password : newPassword
    };
    let header = {Authorization: token}
    if (newPassword === confirmPassword) {
      const response = await axios.post(
        "http://localhost:4000/user/changePassword",
        data,{
          headers: header,
        }
      ).catch(error=>console.log(error));
    } else {
      alert("Password Mismatch");
    }
  };
  const { pathname } = location;
  useEffect(() => {
    getDetails();
    setCount(10);
  }, []);
  return (
    <Fragment>
      <MetaTags>
        <title>Amazing | My Account</title>
        <meta
          name="description"
          content="Compare page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        My Account
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="myaccount-area pb-80 pt-100">
          <div className="container">
            <div className="row">
              <div className="ml-auto mr-auto col-lg-9">
                <div className="myaccount-wrapper">
                  <Accordion defaultActiveKey="0">
                    <Card className="single-my-account mb-20">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="0">
                          <h3 className="panel-title">
                            <span>1 .</span>Account information{" "}
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body>
                          <div className="myaccount-info-wrapper">
                            <div className="account-info-wrapper">
                              <h4>My Account Information</h4>
                              <h5>Your Personal Details</h5>
                              <div className="billing-info">
                              <label>Name: {userDetails.name}</label>
                              </div>
                              <div className="billing-info">
                              <label>Email: {userDetails.email}</label>
                              </div>
                              <div className="billing-info">
                              <label>PhoneNumber: {userDetails.phNum}</label>
                              </div>
                              <div className="billing-info">
                              <label>Username: {userDetails.username}</label>
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    <Card className="single-my-account mb-20">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="1">
                          <h3 className="panel-title">
                            <span>2 .</span> Change your password
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="1">
                        <Card.Body>
                          <div className="myaccount-info-wrapper">
                            <div className="account-info-wrapper">
                              <h4>Change Password</h4>
                              <h5>Your Password</h5>
                            </div>
                            <div className="row">
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Old Password</label>
                                  <input type="password" name="old-password" onChange={(e) =>
                                  setCurrentPassword(e.target.value)
                                }/>
                                </div>
                              </div>
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>New Password</label>
                                  <input type="password" name="new-password" onChange={(e) =>
                                  setNewPassword(e.target.value)
                                }/>
                                </div>
                              </div>
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Password Confirm</label>
                                  <input type="password" name="confirm-password" onChange={(e) =>
                                  setConfirmPassword(e.target.value)
                                }/>
                                </div>
                              </div>
                            </div>
                            <div className="billing-back-btn">
                              <div className="billing-btn">
                                <button type="button" onClick = {(e) => handleChangePassword(e)}>Continue</button>
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    <Card className="single-my-account mb-20">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="2">
                          <h3 className="panel-title">
                            <span>3 .</span> Modify your address book entries{" "}
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="2">
                        <Card.Body>
                          <div className="myaccount-info-wrapper">
                            <div className="account-info-wrapper">
                              <h4>Address Book Entries</h4>
                            </div>
                            <AddressCollection/>
                            {/* <div className="billing-back-btn">
                              <div className="billing-btn">
                                <button type="submit">Continue</button>
                              </div>
                            </div> */}
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

MyAccount.propTypes = {
  location: PropTypes.object,
};

export default MyAccount;
