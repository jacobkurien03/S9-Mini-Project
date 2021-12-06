import PropTypes from "prop-types";
import React, { useEffect, Suspense, lazy } from "react";
import ScrollToTop from "./helpers/scroll-top";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import { multilanguage, loadLanguages } from "redux-multilanguage";
import { connect } from "react-redux";
import { BreadcrumbsProvider } from "react-breadcrumbs-dynamic";

// home pages
const HomeFashion = lazy(() => import("./pages/home/HomeFashion"));
const LandingPage = lazy(() => import("./pages/home/LandingPage"));

//Admin Pages
const SuperAdminHome = lazy(() => import("./pages/superAdmin/AdminHome"))
const ShowUsers = lazy(()=> import("./pages/superAdmin/Users"))
const ShowProducts = lazy(()=> import("./pages/superAdmin/Products"))
const ShowCategory = lazy(()=> import("./pages/superAdmin/Category"))
const ShowSubCategory = lazy(()=> import("./pages/superAdmin/SubCategory"))
// shop pages
const ShopGridStandard = lazy(() => import("./pages/shop/ShopGridStandard"));

// product pages
const ProductTabLeft = lazy(() =>
  import("./pages/shop-product/ProductTabLeft")
);

// blog pages
const BlogStandard = lazy(() => import("./pages/blog/BlogStandard"));
const BlogDetailsStandard = lazy(() =>
  import("./pages/blog/BlogDetailsStandard")
);

// other pages
const About = lazy(() => import("./pages/other/About"));
const Contact = lazy(() => import("./pages/other/Contact"));
const MyAccount = lazy(() => import("./pages/other/MyAccount"));
const LoginRegister = lazy(() => import("./pages/other/LoginRegister"));
const ForgotPassword = lazy(() => import("./pages/other/ForgotPassword"));

const Cart = lazy(() => import("./pages/other/Cart"));
const Wishlist = lazy(() => import("./pages/other/Wishlist"));
const Compare = lazy(() => import("./pages/other/Compare"));
const Checkout = lazy(() => import("./pages/other/Checkout"));

const NotFound = lazy(() => import("./pages/other/NotFound"));
const MailSent = lazy(() => import("./pages/other/MailSent"));

const App = props => {
  useEffect(() => {
    props.dispatch(
      loadLanguages({
        languages: {
          en: require("./translations/english.json"),
          fn: require("./translations/french.json"),
          de: require("./translations/germany.json")
        }
      })
    );
  });

  function setToken(userToken) {
    sessionStorage.setItem('token', JSON.stringify(userToken));
  }
  
  function getToken() {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token
  }

  return (
    <ToastProvider placement="bottom-left">
      <BreadcrumbsProvider>
        <Router>
          <ScrollToTop>
            <Suspense
              fallback={
                <div className="flone-preloader-wrapper">
                  <div className="flone-preloader">
                    <span></span>
                    <span></span>
                  </div>
                </div>
              }
            >
              <Switch>
                <Route
                  exact
                  path={process.env.PUBLIC_URL + "/"}
                  component={HomeFashion}
                />

                {/* Homepages */}
                <Route
                  path={process.env.PUBLIC_URL + "/home-fashion"}
                  component={HomeFashion}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/landingPage"}
                  component={LandingPage}
                />

                {/*SuperAdmin HOme*/}
                <Route
                  path={process.env.PUBLIC_URL + "/SuperAdmin/home"}
                  component={SuperAdminHome}
                />
                {/*Show Users*/}
                <Route
                  path={process.env.PUBLIC_URL + "/SuperAdmin/users"}
                  component={ShowUsers}
                />
                {/*Show category*/}
                <Route
                  path={process.env.PUBLIC_URL + "/SuperAdmin/category"}
                  component={ShowCategory}
                />
                {/*Show sub cateogry*/}
                <Route
                  path={process.env.PUBLIC_URL + "/SuperAdmin/sub-category"}
                  component={ShowSubCategory}
                />
                {/*Show products*/}
                <Route
                  path={process.env.PUBLIC_URL + "/SuperAdmin/products"}
                  component={ShowProducts}
                />

                {/* Shop pages */}
                <Route
                  path={process.env.PUBLIC_URL + "/shop-grid-standard"}
                  component={ShopGridStandard}
                />

                {/* Shop product pages */}
                <Route
                  path={process.env.PUBLIC_URL + "/product-tab-left/:id"}
                  component={ProductTabLeft}
                />

                {/* Blog pages */}
                <Route
                  path={process.env.PUBLIC_URL + "/blog-standard"}
                  component={BlogStandard}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/blog-details-standard"}
                  component={BlogDetailsStandard}
                />

                {/* Other pages */}
                <Route
                  path={process.env.PUBLIC_URL + "/about"}
                  component={About}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/contact"}
                  component={Contact}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/my-account"}
                  component={MyAccount}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/login-register"}
                  component={LoginRegister}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/forgot-password"}
                  component={ForgotPassword}
                />

                <Route
                  path={process.env.PUBLIC_URL + "/cart"}
                  component={Cart}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/wishlist"}
                  component={Wishlist}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/compare"}
                  component={Compare}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/checkout"}
                  component={Checkout}
                />

                <Route
                  path={process.env.PUBLIC_URL + "/not-found"}
                  component={NotFound}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/mail-sent"}
                  component={MailSent}
                />

                <Route exact component={NotFound} />
              </Switch>
            </Suspense>
          </ScrollToTop>
        </Router>
      </BreadcrumbsProvider>
    </ToastProvider>
  );
};

App.propTypes = {
  dispatch: PropTypes.func
};

export default connect()(multilanguage(App));
