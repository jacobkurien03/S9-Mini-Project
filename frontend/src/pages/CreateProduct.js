import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button, Image, FloatingLabel, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { listProductDetails, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";
import axios from "axios";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { refreshLogin, getUserDetails } from "../actions/userActions";
import "../styles/error.css";

import FormContainer from "../components/FormContainer";

const ProductEditPage = ({ match, history }) => {
  // all variable for stroing product details
  const productId = match.params.id;
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [dbcategory, SetDbCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0.0);
  const [countInStock, setCountInStock] = useState(0);

  // to upload product image
  const [uploading, setUploading] = useState(false);
  const [errorImageUpload, setErrorImageUpload] = useState("");
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product, error } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = productUpdate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { error: userLoginError } = userDetails;

  const validName = /^[a-zA-Z ]*$/;
  const validImage = /\.(jpg|jpeg|png|gif)$/;

  const [nameError, setNameError] = useState(false);
  const [brandError, setBrandError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  const fullNameError = document.querySelector(".fullname .error");
  const brandNameError = document.querySelector(".brandName .error");
  const descriptionNameError = document.querySelector(".description .error");

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
  const validateBrand = () => {
    if (validName.test(brand)) {
      setBrandError(false);
    } else if (brand == "") {
      brandNameError.innerText = "Field cannot be blank";
      setBrandError(true);
    } else {
      brandNameError.innerText = "Brand Name should not contain numbers";
      setBrandError(true);
    }
  };
  const validateDescription = () => {
    if (validName.test(description)) {
      setDescriptionError(false);
    } else if (description == "") {
      descriptionNameError.innerText = "Field cannot be blank";
      setDescriptionError(true);
    } else {
      descriptionNameError.innerText = "Description should not contain numbers";
      setDescriptionError(true);
    }
  };

  async function getCategory() {
    let response = await axios.post("/api/products/category");
    if (response.status === 200) {
      SetDbCategory(response.data);
    }
  }
  useEffect(() => {
    getCategory();
  }, []);

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

  // submit the product details
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nameError === false && brandError === false) {
      let data = {
        name: name,
        brand: brand,
        price: price,
        category: category,
        description: description,
        countInStock: countInStock,
        image: image,
        id: userInfo.id,
      };
      let response = await axios.post(`/api/products/`, data);
      if (response.status == 201) {
        history.push("/admin/productlist");
      }
    }
  };

  // for image input, use a ref
  const inputFile = useRef(null);

  // click the above ref, to handle the overlay div above the product image
  const handleImageClick = () => {
    inputFile.current.click();
  };

  // submit file to aws bucket, get the url
  const handleFileUpload = async (event) => {
    const formData = new FormData();
    const f = event.target.files[0];
    const fn = event.target.files[0].name;
    console.log(/\.(jpe?g|png|gif|bmp)$/i.test(fn));
    if (/\.(jpe?g|png|gif|bmp)$/i.test(fn)) {
      formData.append("file", f);
      formData.append("filename", fn);
      setUploading(true);
      try {
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
        let { data } = await axios.post(`/api/upload`, formData, config);
        let value = "/static/" + data;
        setImage(value);
        setUploading(false);
      } catch (error) {
        console.log(error);
        setErrorImageUpload("Please choose a valid image");
        setUploading(false);
      }
    } else {
      alert("Invalid Image Type");
    }
  };
  let url = "http://localhost:5000";
  return (
    <>
      <Link to="/admin/productlist">
        <Button variant="outline-primary" className="mt-3">
          Go Back
        </Button>
      </Link>
      <FormContainer style={{ marginTop: "-2em" }}>
        <h1>Create Product</h1>
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
                    className="fullname mb-3"
                  >
                    <Form.Control
                      size="lg"
                      placeholder="Enter Name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onKeyUp={() => validateName()}
                      required
                    />
                    <div
                      className={
                        nameError
                          ? "error error-visible "
                          : "error error-hidden"
                      }
                    ></div>
                    <br />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group controlId="price">
                  <FloatingLabel
                    controlId="priceinput"
                    label="Price"
                    className="mb-3"
                  >
                    <Form.Control
                      size="lg"
                      placeholder="Enter price"
                      type="number"
                      value={price}
                      min="0"
                      max="100000"
                      step="0.1"
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </FloatingLabel>
                </Form.Group>
                {errorImageUpload && (
                  <Message dismissible variant="danger" duration={10}>
                    {errorImageUpload}
                  </Message>
                )}
                {uploading ? (
                  <div>Uploading...</div>
                ) : (
                  <Form.Group controlId="image">
                    <Row>
                      <Col md={9}>
                        <FloatingLabel
                          controlId="imageinput"
                          label="Image URL"
                          className="mb-3"
                        >
                          <Form.Control
                            size="lg"
                            placeholder="Enter image URL"
                            type="text"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            required
                          />
                        </FloatingLabel>
                      </Col>
                      <Col md={3}>
                        <input
                          accept="image/*"
                          type="file"
                          id="file"
                          ref={inputFile}
                          onChange={(event) => {
                            handleFileUpload(event);
                          }}
                          style={{ display: "none" }}
                        />
                        <div
                          className="profile-page-image"
                          style={{
                            alignSelf: "center",
                          }}
                        >
                          <Image
                            src={image}
                            alt={name}
                            title="Click to input file"
                            style={{
                              width: "100%",
                              border: "1px solid #ced4da",
                              marginBottom: "1em",
                              cursor: "pointer",
                              borderRadius: "0.25rem",
                            }}
                          />
                          <div
                            className="image-overlay-product"
                            onClick={handleImageClick}
                          >
                            Click to upload image
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Form.Group>
                )}
                <Form.Group controlId="brand">
                  <FloatingLabel
                    controlId="brandinput"
                    label="Brand"
                    className="brandName mb-3"
                  >
                    <Form.Control
                      size="lg"
                      placeholder="Enter brand"
                      type="text"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      onKeyUp={() => validateBrand()}
                      required
                    />
                    <div
                      className={
                        brandError
                          ? "error error-visible "
                          : "error error-hidden"
                      }
                    ></div>
                    <br />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group controlId="category">
                  <FloatingLabel
                    controlId="categoryinput"
                    label="Category"
                    className="mb-3"
                  >
                    <Form.Control
                      as="select"
                      size="lg"
                      placeholder="Enter category"
                      type="text"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      required
                    >
                      {dbcategory &&
                        dbcategory.length > 0 &&
                        dbcategory.map((categ) => {
                          return (
                            <option value={categ.name}>{categ.name}</option>
                          );
                        })}
                    </Form.Control>
                  </FloatingLabel>
                </Form.Group>
                <Form.Group controlId="description">
                  <FloatingLabel
                    controlId="descinput"
                    label="Description"
                    className="description mb-3"
                  >
                    <Form.Control
                      size="lg"
                      placeholder="Enter description URL"
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                      onKeyUp={() => validateDescription()}
                    />
                    <div
                      className={
                        descriptionError
                          ? "error error-visible "
                          : "error error-hidden"
                      }
                    ></div>
                    <br />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group controlId="countInStock">
                  <FloatingLabel
                    controlId="countinstockinput"
                    label="CountInStock"
                    className="mb-3"
                  >
                    <Form.Control
                      size="lg"
                      placeholder="Enter Count In Stock"
                      type="number"
                      min="0"
                      max="1000"
                      value={countInStock}
                      onChange={(e) => setCountInStock(e.target.value)}
                      required
                    />
                  </FloatingLabel>
                </Form.Group>
                <div className="d-flex">
                  <Button type="submit" className="my-1 ms-auto">
                    Create Product
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

export default ProductEditPage;
