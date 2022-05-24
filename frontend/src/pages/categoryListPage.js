import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button, Row, Col } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import axios from "axios";
import {
  listCategory,
  deleteCategory,
  createCategory,
} from "../actions/productActions";
import { CATEGORY_CREATE_RESET } from "../constants/productConstants";
import Paginate from "../components/Paginate";
import { refreshLogin, getUserDetails } from "../actions/userActions";

const CategoryListPage = ({ history, match }) => {
  const [category1, SetCategory] = useState([]);
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.categoryList);
  const { loading, categorys, error, pages, page } = categoryList;

  const categoryDelete = useSelector((state) => state.categoryDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = categoryDelete;

  const categoryCreate = useSelector((state) => state.categoryCreate);
  const {
    loading: loadingCreate,
    success: successCreate,
    error: errorCreate,
    category: createdcategory,
  } = categoryCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { error: userLoginError } = userDetails;

  const token = window.localStorage.getItem("refreshToken")
  async function getCategory() {
    let response = await axios.post(
      "/api/products/category",
    );
    if (response.status === 200) {
      SetCategory(response.data);
    }
  }
  useEffect(() => {
    getCategory();
  }, []);

  // fetch user login info
  useEffect(() => {
    userInfo
      ? userInfo.isSocialLogin
        ? dispatch(getUserDetails(userInfo.id))
        : dispatch(getUserDetails("profile"))
      : dispatch(getUserDetails("profile"));
  }, [userInfo, dispatch]);

  // refresh token for expired access tokens
  useEffect(() => {
    if (userLoginError && userInfo && !userInfo.isSocialLogin) {
      const user = JSON.parse(localStorage.getItem("userInfo"));
      user && dispatch(refreshLogin(user.email));
    }
  }, [userLoginError, dispatch, userInfo]);

  useEffect(() => {
    if (!userInfo.isAdmin) history.push("/login");
    dispatch({ type: CATEGORY_CREATE_RESET }); //reset the new product detail
    // if (successCreate)
    //   history.push(`/admin/product/category/${createdcategory._id}/edit`);
    // else dispatch(listCategory("", pageNumber, 10)); // 3rd parameter is the no of products to be listed per page
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdcategory,
    pageNumber,
    categorys,
  ]);

  // delete product after confirming
  async function handleDelete(id){
    if (window.confirm("Are you sure you wanna delete this category?")){
      let response = await axios.post(
        `/api/products/categoryDelete/`+id,
      );
      console.log(response.status)
      if (response.status === 200) {
        getCategory()
      }
      else{
        alert(response.message)
      }
    }
  };
  // create a new dummy product
  const handleCreateCategory = () => {
    history.push('/admin/createCategory');
  };
  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Categories</h1>
        </Col>
        <Col style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            className="my-3"
            style={{
              padding: "0.5em 1em",
            }}
            onClick={handleCreateCategory}
          >
            <i className="fas fa-plus" /> Create Category
          </Button>
        </Col>
      </Row>
      {errorDelete && (
        <Message dismissible variant="danger" duration={10}>
          {errorDelete}
        </Message>
      )}
      {errorCreate && (
        <Message dismissible variant="danger" duration={10}>
          {errorCreate}
        </Message>
      )}
      {loading || loadingCreate || loadingDelete ? (
        <Loader />
      ) : error ? (
        <Message dismissible variant="danger" duration={10}>
          {error}
        </Message>
      ) : (
        <>
          <Table striped bordered responsive className="table-sm text-center">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>Description</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {category1 &&
                category1.map((category) => {
                  return (
                    <tr key={category._id}>
                      <td>{category._id}</td>
                      <td>{category.name}</td>
                      <td>{category.description}</td>

                      <td
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-around",
                        }}
                      >
                        <LinkContainer
                          to={`/admin/product/category/${category._id}/edit`}
                        >
                          <Button variant="link" className="btn-sm">
                            <i className="fas fa-edit" />
                          </Button>
                        </LinkContainer>
                        <Button
                          className="btn-sm"
                          onClick={() => handleDelete(category._id)}
                          variant="danger"
                        >
                          <i
                            style={{
                              fontSize: "0.9em",
                              padding: "0",
                            }}
                            className="fas fa-trash"
                          />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default CategoryListPage;
