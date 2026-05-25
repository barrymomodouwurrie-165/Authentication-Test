// import React from 'react'

const LoginPage = () => {
  return (
    <>
      <h1 className="sign-in-header-title">Log In here</h1>
      <div className="sign-in-form-container">
        <form action="">
          <p className="sign-in-para-email">Email</p>
          <input type="email" />
          <p className="sign-in-para-password">Password</p>
          <div>

          <input type="text" />
          <button className="sign-in-hide-button">Hide</button>
          </div>
          <button className="sign-in-create-button">Sign In</button>
        </form>
      </div>
    </>
  );
}

export default LoginPage
