import React from 'react'
import { Link } from "react-router-dom";

function LoggedOut() {
    return (
        <div className="account-dropdown">
          <ul>
            <li>
              <Link to={process.env.PUBLIC_URL + "/login-register"}>Login</Link>
            </li>
            <li>
              <Link to={process.env.PUBLIC_URL + "/login-register"}>
                Register
              </Link>
            </li>
          </ul>
        </div>
    )
}

export default LoggedOut
