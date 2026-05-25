// import React from 'react'
import { Link } from "react-router";

const HomePage = () => {
    return (
      <>
        <div>
          <ul>
            <li>
              <Link to="/">Home </Link>
            </li>
            <li>
              <Link to="/signup">SignUp</Link>
            </li>
            <li>
              <Link to="/login">Login </Link>
            </li>
          </ul>
        </div>
        <div>Welcome Back</div>
      </>
    );
};

export default HomePage;
