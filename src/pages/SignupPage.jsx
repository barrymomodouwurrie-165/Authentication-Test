// import React from 'react'
// import { useState, useEffect } from "react"

const SignupPage = () => {
  return (
    <>
      <h1 className="sign-up-header-title">Create your Account here</h1>
      <div className="sign-up-form-container">
        <form action="">
          <p className="sign-up-para-name">Full Name</p>
          <input type="text" />
          <p className="sign-up-para-email">Email</p>
          <input type="email" />
          <p className="sign-up-para-password">Password</p>
          <input type="text" />
          {/* <button className="hide-button">Hide</button> */}
          <button className="sign-up-create-button">Create Account</button>
        </form>
      </div>
    </>
  );
}

export default SignupPage
