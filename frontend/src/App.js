import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import ConfirmPage from "./pages/ConfirmPage";
import ShippingPage from "./pages/ShippingPage";
import PaymentPage from "./pages/PaymentPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import OrderPage from "./pages/OrderPage";
import PasswordResetPage from "./pages/PasswordResetPage";
import UserListPage from "./pages/UserListPage";
import UserEditPage from "./pages/UserEditPage";
import ProductListPage from "./pages/ProductListPage";
import CategoryListPage from "./pages/categoryListPage";
import ProductEditPage from "./pages/ProductEditPage";
import CategoryEditPage from "./pages/CategoryEditPage";
import OrderListPage from "./pages/OrderListPage";
import ErrorPage from "./pages/ErrorPage";
import Wishlist from "./pages/Wishlist";
import CreateCategory from "./pages/CreateCategory";
import MyAddress from "./pages/MyAddress";
import MyAddressListPage from "./pages/MyAddressListPage";
import UpdateAddressPage from "./pages/UpdateAddressPage";
import CreateProductPage from "./pages/CreateProduct"

// for showing the 'new update available' banner and to register the service worker
import ServiceWorkerWrapper from "./ServiceWorkerWrapper";

const App = () => {
  return (
    <Router>
      <Header />
      <ServiceWorkerWrapper />

      <main className="py-2">
        <Container>
          <Switch>
            <Route path="/" component={HomePage} exact />
            <Route path="/search/:keyword" component={HomePage} exact />
            <Route path="/page/:pageNumber" component={HomePage} exact />
            <Route
              path="/search/:keyword/page/:pageNumber"
              exact
              component={HomePage}
            />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Route
              path="/user/password/reset/:token"
              component={PasswordResetPage}
            />
            <Route path="/profile" component={ProfilePage} />
            <Route path="/product/:id" component={ProductPage} />
            <Route path="/cart/:id?" component={CartPage} />
            <Route path="/wishlist/:id?" component={Wishlist} />
            <Route path="/user/confirm/:token" component={ConfirmPage} exact />
            <Route path="/shipping" component={ShippingPage} />
            <Route path="/myaddress" component={MyAddressListPage} />
            <Route path="/createAddress" component={MyAddress} />
            <Route path="/updateAddress/:id" component={UpdateAddressPage} />
            <Route path="/payment" component={PaymentPage} />
            <Route path="/placeorder" component={PlaceOrderPage} />
            <Route path="/order/:id" component={OrderPage} />
            <Route path="/admin/userlist" component={UserListPage} exact />
            <Route path="/admin/createCategory" component={CreateCategory} exact />
            <Route
              path="/admin/userlist/:pageNumber"
              component={UserListPage}
              exact
            />
            <Route path="/admin/user/:id/edit" component={UserEditPage} />
            <Route
              path="/admin/productlist"
              exact
              component={ProductListPage}
            />
            <Route
              path="/admin/categorylist"
              exact
              component={CategoryListPage}
            />
            <Route
              path="/admin/productlist/:pageNumber"
              component={ProductListPage}
              exact
            />
            <Route path="/admin/product/:id/edit" component={ProductEditPage} />
            <Route path="/admin/createproduct" component={CreateProductPage} />
            <Route path="/admin/product/category/:id/edit" component={CategoryEditPage} />
            <Route path="/admin/orderlist" component={OrderListPage} exact />
            <Route
              path="/admin/orderlist/:pageNumber"
              component={OrderListPage}
              exact
            />
            <Route component={ErrorPage} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
