import { Link } from "react-router";
import "./Navbar.css";

const Navbar = () => {
  return (
      <div className="nav-container">
        <div></div>
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
  );
};

export default Navbar;
