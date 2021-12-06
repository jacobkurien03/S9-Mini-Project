import React, { Fragment } from "react";
import "./AdminHome.css";
import MetaTags from "react-meta-tags";
import LayoutSuperAdmin from "../../layouts/LayoutSuperAdmin";
import { Card } from "react-bootstrap";

const AdminHome = () => {
  return (
    <Fragment>
      <MetaTags>
        <title>Admin | Home</title>
        <meta name="description" content="Admin home page." />
      </MetaTags>
      <LayoutSuperAdmin
        headerContainerClass="container-fluid"
        headerPaddingClass="header-padding-1"
      ><div className = "test">
        <table cellpadding="20%"cellspacing="20%">
          <tr>
            <td>
              <Card className="" style={{ width: "20rem" }}>
                <Card.Body>
                  <Card.Title style={{ fontSize: "3rem" }}>07</Card.Title>
                  <Card.Subtitle
                    className="mb-2 text-muted"
                    style={{ fontSize: "1.5rem" }}
                  >
                    Total Users
                  </Card.Subtitle>
                </Card.Body>
              </Card>
            </td>
            <td>
              <Card className="" style={{ width: "20rem" }}>
                <Card.Body>
                  <Card.Title style={{ fontSize: "3rem" }}>15</Card.Title>
                  <Card.Subtitle
                    className="mb-2 text-muted"
                    style={{ fontSize: "1.5rem" }}
                  >
                    Total Admins
                  </Card.Subtitle>
                </Card.Body>
              </Card>
            </td>
          </tr>
          <tr>
            <td>
              <Card className="" style={{ width: "20rem" }}>
                <Card.Body>
                  <Card.Title style={{ fontSize: "3rem" }}>5</Card.Title>
                  <Card.Subtitle
                    className="mb-2 text-muted"
                    style={{ fontSize: "1.5rem" }}
                  >
                    Sales Report
                  </Card.Subtitle>
                </Card.Body>
              </Card>
            </td>
            <td>
              <Card className="" style={{ width: "20rem" }}>
                <Card.Body>
                  <Card.Title style={{ fontSize: "3rem" }}>22</Card.Title>
                  <Card.Subtitle
                    className="mb-2 text-muted"
                    style={{ fontSize: "1.5rem" }}
                  >
                    Goal
                  </Card.Subtitle>
                </Card.Body>
              </Card>
            </td>
          </tr>
        </table>
        </div>
      </LayoutSuperAdmin>
    </Fragment>
  );
};

export default AdminHome;
