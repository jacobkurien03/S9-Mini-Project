import React, { Fragment, useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import LayoutSuperAdmin from "../../layouts/LayoutSuperAdmin";
import "./users.css";
import { Table } from "react-bootstrap";
import { Link, Route, useLocation } from "react-router-dom";
const axios = require("axios");

const Products = () => {
  const [category, SetCategory] = useState([]);
  const [userId, setUserId] = useState();
  const [count, setCount] = useState([0]);
  const token = window.localStorage.getItem("token");

  async function getCategory() {
    let response = await axios.get(
      "http://localhost:4000/superadmin/showProducts",
      {
        headers: { Authorization: token },
      }
    );
    if (response.status === 200) {
      SetCategory(response.data.response);
    }
  }
  async function deleteCategory() {
    let data = {
      userID: userId,
    };
    let response = await axios.post(
      "http://localhost:4000/superadmin/deleteProduct",
      data,
      {
        headers: { Authorization: token },
      }
    );
  }

  useEffect(() => {
    getCategory();
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
                <th>Description</th>
                <th>Category</th>
                <th>Price</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {category &&
                category.length > 0 &&
                category.map((p) => {
                  return (
                    <tr>
                      <td>{p.productname}</td>
                      <td>{p.productDesc}</td>
                      <td>{p.categoryId}</td>
                      <td>{p.price}</td>
                      <td>{p.quantity}</td>
                      <td colSpan="2">
                        <button
                          className="btn btn-success"
                          data-toggle="modal"
                          data-target="#exampleModal"
                        >
                          Edit <i className="fa fa-edit"></i>
                        </button>
                        <button className="btn btn-danger" onClick={()=>deleteCategory}>
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

export default Products;
