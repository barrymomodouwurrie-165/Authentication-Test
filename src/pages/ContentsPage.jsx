// import React from 'react'
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router";

const ContentsPage = () => {
  const { user } = useAuth();

  if (!user?.accessToken) {
    <Navigate to="/login" replace />;
  }
  return <div>Hello {user.user?.name}</div>;
};

export default ContentsPage;
