import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import MetaTags from "react-meta-tags";
import { Link, useHistory } from "react-router-dom";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import LayoutOne from "../../layouts/LayoutOne";

const axios = require("axios");

const ForgotPassword = ({ location }) => {
  const [userName, setUsername] = useState(null);
  const { pathname } = location;
  let history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username:userName
    };
    if (userName) {
      const response = await axios.post(
        "http://localhost:4000/api/forgotPassword",
        data
      );
      alert(response.data.message);
      history.push("/mail-sent")
    } else {
      alert("Enter Value to Submit");
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

        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="login">
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link eventKey="login">
                          <h4>Forgot Password</h4>
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
                                  setUsername(e.target.value)
                                }
                              />
                              <div className="button-box">
                                <button
                                  type="button"
                                  onClick={(e) => handleSubmit(e)}
                                >
                                  <span>Send Email</span>
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

ForgotPassword.propTypes = {
  location: PropTypes.object,
};

export default ForgotPassword;
