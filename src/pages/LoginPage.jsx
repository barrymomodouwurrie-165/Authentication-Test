import { useState } from "react";
import { useAuth } from "../context/AuthContext";



const LoginPage = () => {
  const { signEmail, signPassword, setSignEmail, setSignPassword, handleLogin } = useAuth()
  const [alter, setAlter] = useState("Show");
  const [isShowing, setIsShowing] = useState(false);

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
