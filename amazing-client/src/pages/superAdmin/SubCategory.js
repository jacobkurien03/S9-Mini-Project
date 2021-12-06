import React, { Fragment, useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import LayoutSuperAdmin from "../../layouts/LayoutSuperAdmin";
import "./users.css";
import { Table } from "react-bootstrap";
import { Link, Route, useLocation } from "react-router-dom";
const axios = require("axios");

const SubCategory = () => {
  const [subCategory, SetSubCategory] = useState([]);
  const [userId, setUserId] = useState([]);
  const [count, setCount] = useState([0]);
  const token = window.localStorage.getItem("token");

  async function getSubCategory() {
    let response = await axios.get(
      "http://localhost:4000/superadmin/showSubCategories",
      {
        headers: { Authorization: token },
      }
    );
    if (response.status === 200) {
      SetSubCategory(response.data.response);
    }
  }
  async function deleteSubCategory() {
    let data = {
      userID: userId,
    };
    let response = await axios.post(
      "http://localhost:4000/superadmin/deleteSubCategory",
      data,
      {
        headers: { Authorization: token },
      }
    );
  }

  useEffect(() => {
    getSubCategory();
    setCount(10)
  }, []);
  return (
    <Fragment>
      <MetaTags>
        <title>Admin | Users</title>
        <meta name="description" content="Admin home page." />
      </MetaTags>
      <LayoutSuperAdmin
        headerContainerClass="container-fluid"
        headerPaddingClass="header-padding-1"
      >
        <main>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {subCategory &&
                subCategory.length > 0 &&
                subCategory.map((p) => {
                  return (
                    <tr>
                      <td>{p.name}</td>
                      <td colSpan="2">
                        <button
                          className="btn btn-success"
                          data-toggle="modal"
                          data-target="#exampleModal"
                        >
                          Edit <i className="fa fa-edit"></i>
                        </button>
                        <button className="btn btn-danger" onClick={()=>deleteSubCategory}>
                          <i className="fa fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </main>
      </LayoutSuperAdmin>
    </Fragment>
  );
};

export default SubCategory;
