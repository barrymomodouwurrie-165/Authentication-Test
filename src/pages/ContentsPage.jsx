// import React from 'react'
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router";
import Comments from "./Comments";
import "./Navbar.css";
import "./Comments.css";

const ContentsPage = () => {
  const { user, handleLogout, handleTxtChange, comment, handleSendComment } =
    useAuth();

  if (!user?.accessToken) return <Navigate to="/login" replace />;

  return (
    <>
      <div className="nav-container">
        <div className="user-info">Hello, {user?.user?.name}</div>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <h3>Kindly tell us about yourself</h3>
      <div>
        <form action="" className="content-form">
          <textarea
            onChange={handleTxtChange}
            value={comment}
            name=""
            id=""
            className="text-area"
            placeholder={`Tell us about ${user?.user?.name}`}
          ></textarea>
          <button
            className="send-btn"
            type="button"
            onClick={handleSendComment}
          >
            Send
          </button>
        </form>
        <Comments />
      </div>
    </>
  );
};

export default ContentsPage;
