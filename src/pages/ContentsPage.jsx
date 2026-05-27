// import React from 'react'
import { useAuth } from "../context/AuthContext";

const ContentsPage = () => {
  const { user } = useAuth();
  return <div>Hello {user.user?.name}</div>;
};

export default ContentsPage;
