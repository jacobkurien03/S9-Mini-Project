import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { multilanguage } from "redux-multilanguage";

const NavMenuSuperAdmin = ({ strings, menuWhiteClass, sidebarMenu }) => {
  return (
    <div
      className={` ${
        sidebarMenu
          ? "sidebar-menu"
          : `main-menu ${menuWhiteClass ? menuWhiteClass : ""}`
      } `}
    >
      <nav>
        <ul>
        <li><Link to={process.env.PUBLIC_URL + "/SuperAdmin/home"}>
              Home
            </Link></li>
          <li>
            <Link to={process.env.PUBLIC_URL + "/SuperAdmin/users"}>
              Users Controller
              {sidebarMenu ? (
                <span>
                  <i className="fa fa-angle-right"></i>
                </span>
              ) : (
                <i className="fa fa-angle-down" />
              )}
            </Link>
            <ul className="mega-menu mega-menu-padding">
              <li>
                <ul>
                  <li className="mega-menu-title">
                    <Link>User Head</Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/SuperAdmin/users"}>
                      Show Users
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={process.env.PUBLIC_URL + "/SuperAdmin/users"}
                    >
                      Add New User
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <ul>
                  <li className="mega-menu-title">
                    <Link>Admin Head</Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/SuperAdmin/users"}>
                      Add Admin
                    </Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/SuperAdmin/users"}>
                      Show Admins
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          

          <li>
            <Link to={process.env.PUBLIC_URL + "/SuperAdmin/category"}>
              Category Controller
              {sidebarMenu ? (
                <span>
                  <i className="fa fa-angle-right"></i>
                </span>
              ) : (
                <i className="fa fa-angle-down" />
              )}
            </Link>
            <ul className="submenu">
              <li>
                <Link to={process.env.PUBLIC_URL + "/SuperAdmin/category"}>
                  Add New Category
                </Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/SuperAdmin/category"}>
                  Remove Category
                </Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/SuperAdmin/category"}>
                  ShowAll Categories
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to={process.env.PUBLIC_URL + "/SuperAdmin/sub-category"}>
              Sub-Category Controller
              {sidebarMenu ? (
                <span>
                  <i className="fa fa-angle-right"></i>
                </span>
              ) : (
                <i className="fa fa-angle-down" />
              )}
            </Link>
            <ul className="submenu">
              <li>
                <Link to={process.env.PUBLIC_URL + "/SuperAdmin/sub-category"}>
                  Add New Sub-Category
                </Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/SuperAdmin/sub-category"}>
                  Remove Sub-Category
                </Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/SuperAdmin/sub-category"}>
                  ShowAll Sub-Categories
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to={process.env.PUBLIC_URL + "/SuperAdmin/products"}>
              Product Controller
              {sidebarMenu ? (
                <span>
                  <i className="fa fa-angle-right"></i>
                </span>
              ) : (
                <i className="fa fa-angle-down" />
              )}
            </Link>
            <ul className="submenu">
              <li>
                <Link to={process.env.PUBLIC_URL + "/SuperAdmin/products"}>
                  Add New Product
                </Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/SuperAdmin/products"}>
                  Remove Product
                </Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/SuperAdmin/products"}>
                  Show Products
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
};

NavMenuSuperAdmin.propTypes = {
  menuWhiteClass: PropTypes.string,
  sidebarMenu: PropTypes.bool,
  strings: PropTypes.object,
};

export default multilanguage(NavMenuSuperAdmin);
