import React from 'react'
import { Link } from "react-router-dom";

function LoggedIn() {
    const handleSubmit = () =>{
        window.localStorage.removeItem("token")
    }

    return (
        <div className="account-dropdown">
          <ul>
            <li>
              <Link to={process.env.PUBLIC_URL + "/login-register" }onClick = {handleSubmit}>Logout</Link>
            </li>
            <li>
              <Link to={process.env.PUBLIC_URL + "/my-account"}>
                my account
              </Link>
            </li>
          </ul>
        </div>
    )
}

export default LoggedIn
