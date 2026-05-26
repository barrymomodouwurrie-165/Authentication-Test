import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
const LoginPage = (user, setUser) => {
  const [signEmail, setSignEmail] = useState("");
  const [signPassword, setSignPassword] = useState("");
  const [alter, setAlter] = useState("Show");
  const [isShowing, setIsShowing] = useState(false);
  const Navigate = useNavigate();

  const handlePassword = () => {
    if (alter === "Show") {
      setAlter("Hide");
      setIsShowing(true);
    }
    if (alter === "Hide") {
      setAlter("Show");
      setIsShowing(false);
    }
  };

  const handleLogin = async () => {
    if (signEmail !== "" && signPassword !== "") {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email: signEmail,
          password: signPassword,
        },
      );
      setSignEmail("");
      setSignPassword("");
      Navigate("/contents");
      console.log(response.data);
      
    }
  };
  return (
    <>
      <h1 className="sign-in-header-title">Log In here</h1>
      <div className="sign-in-form-container">
        <p className="sign-in-para-email">Email</p>
        <input
          type="email"
          onChange={(e) => setSignEmail(e.target.value)}
          value={signEmail}
        />
        <p className="sign-in-para-password">Password</p>
        <div>
          <input
            type={isShowing ? "text" : "password"}
            onChange={(e) => setSignPassword(e.target.value)}
            value={signPassword}
          />
          <button className="sign-in-hide-button" onClick={handlePassword}>
            {alter}
          </button>
        </div>
        <button className="sign-in-create-button" onClick={handleLogin}>
          Sign In
        </button>
      </div>
    </>
  );
};

export default LoginPage;
