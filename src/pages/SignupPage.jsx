// import React from 'react'
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleFormSubmittion = async (e) => {
    e.preventDefault();
    if (name !== "" && email !== "" && password !== "") {
      await axios.post("http://localhost:5000/api/users/sign_up", {
        name,
        email,
        password,
      });
      Navigate("/");
      setName("");
      setEmail("");
      setPassword("");
    } else {
      alert("Fill all fields");
    }
  };
  return (
    <>
      <h1 className="sign-up-header-title">Create your Account here</h1>
      <div className="sign-up-form-container">
        <form action="">
          <p className="sign-up-para-name">Full Name</p>
          <input onChange={handleNameChange} value={name} type="text" />
          <p className="sign-up-para-email">Email</p>
          <input onChange={handleEmailChange} value={email} type="email" />
          <p className="sign-up-para-password">Password</p>
          <input onChange={handlePasswordChange} value={password} type="text" />
          {/* <button className="hide-button">Hide</button> */}
          <button
            className="sign-up-create-button"
            onClick={handleFormSubmittion}
          >
            Create Account
          </button>
        </form>
      </div>
    </>
  );
};

export default SignupPage;
