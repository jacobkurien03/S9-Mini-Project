import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { listCategoryDetails, updateCategory } from "../actions/productActions";
import { CATEGORY_UPDATE_RESET } from "../constants/productConstants";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { refreshLogin, getUserDetails } from "../actions/userActions";

import FormContainer from "../components/FormContainer";

import axios from "axios";

const CategoryEditPage = ({ match, history }) => {
  // all variable for stroing product details
  const categoryId = match.params.id;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const categoryDetails = useSelector((state) => state.categoryDetails);
  const { loading, category, error } = categoryDetails;

  const categoryUpdate = useSelector((state) => state.categoryUpdate);
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = categoryUpdate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { error: userLoginError } = userDetails;

  // fetch user login details
  useEffect(() => {
    userInfo
      ? userInfo.isSocialLogin
        ? dispatch(getUserDetails(userInfo.id))
        : dispatch(getUserDetails("profile"))
      : dispatch(getUserDetails("profile"));
  }, [userInfo, dispatch]);

  // fetch new access tokens if user details fail, using the refresh token
  useEffect(() => {
    if (userLoginError && userInfo && !userInfo.isSocialLogin) {
      const user = JSON.parse(localStorage.getItem("userInfo"));
      user && dispatch(refreshLogin(user.email));
    }
  }, [userLoginError, dispatch, userInfo]);

  useEffect(() => {
    dispatch(listCategoryDetails(categoryId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // update the product details in state
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: CATEGORY_UPDATE_RESET });
      history.push("/admin/categorylist");
    } else {
      if (!category || category._id !== categoryId) {
        dispatch(listCategoryDetails(categoryId));
      } else {
        setName(category.name);
        setDescription(category.description);
      }
    }
  }, [category, dispatch, categoryId, history, successUpdate]);

  // submit the category details
  const handleSubmit = async (e) => {
    if (window.confirm("Are you sure you wanna update this category?")) {
      let data = {
        name: name,
        description: description,
      };
      let response = await axios.post(
        `/api/products/categoryupdate/` + categoryId,
        data
      );
    }
  };

  return (
    <>
      <Link to="/admin/categorylist">
        <Button variant="outline-primary" className="mt-3">
          Go Back
        </Button>
      </Link>
      <FormContainer style={{ marginTop: "-2em" }}>
        <h1>Edit category</h1>
        {loadingUpdate ? (
          <Loader />
        ) : errorUpdate ? (
          <Message dismissible variant="danger" duration={10}>
            {errorUpdate}
          </Message>
        ) : (
          <>
            {loading ? (
              <Loader />
            ) : (
              <Form onSubmit={handleSubmit}>
                {error && (
                  <Message dismissible variant="danger" duration={10}>
                    {error}
                  </Message>
                )}
                <Form.Group controlId="name">
                  <FloatingLabel
                    controlId="nameinput"
                    label="Name"
                    className="mb-3"
                  >
                    <Form.Control
                      size="lg"
                      placeholder="Enter Name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group controlId="description">
                  <FloatingLabel
                    controlId="descinput"
                    label="Description"
                    className="mb-3"
                  >
                    <Form.Control
                      size="lg"
                      placeholder="Enter description URL"
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </FloatingLabel>
                </Form.Group>
                <div className="d-flex">
                  <Button type="submit" className="my-1 ms-auto">
                    Update category
                  </Button>
                </div>
              </Form>
            )}
          </>
        )}
      </FormContainer>
    </>
  );
};

export default CategoryEditPage;
