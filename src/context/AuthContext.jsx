/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import dayjs from "dayjs";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userData")) || null,
  );
  const navigate = useNavigate();
  const [signEmail, setSignEmail] = useState("");
  const [signPassword, setSignPassword] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const handleTxtChange = (e) => {
    setComment(e.target.value);
  };

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(user));
  }, [user]);

  const handleLogin = async () => {
    if (signEmail !== "" && signPassword !== "") {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/users/login",
          {
            email: signEmail,
            password: signPassword,
          },
        );
        setSignEmail("");
        setSignPassword("");
        if (response.status === 200) {
          setUser(response.data);
          navigate("/contents");
        }
        if (response.status === 400) {
          let message = response?.data?.message || response?.data?.err;
          alert(message);
        }
      } catch (err) {
        let message = err.response?.data?.message || err.response?.data?.err;
        alert(message);
      }
    }
  };
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/users/logout");
      setUser(null);
      localStorage.clear();
      navigate("/");
    } catch (error) {
      error;
    }
  };

  const handleSendComment = async (e) => {
    e.preventDefault();
    try {
      const currentDate = dayjs().format("MMMM D, YYYY");
      const currentTime = dayjs().format("HH:mm A");
      await axios.post("http://localhost:5000/api/users/comments", {
        date: currentDate,
        name: user.user.name,
        comment,
        time: currentTime,
      });
      getComments();
      setComment("");
    } catch (err) {
      console.log(err);
    }
  };
  const getComments = async () => {
    const response = await axios.get(
      "http://localhost:5000/api/users/comments",
    );
    const comments = response.data;
    setComments(comments);
  };
  useEffect(() => {
    getComments();
  }, []);
  useEffect(() => {
    const checkRefresh = async () => {
      const result = await axios.post(
        "http://localhost:5000/api/users/refresh_token",
      );
      setUser((prev) => ({ ...prev, accessToken: result.data.accessToken }));
    };
    checkRefresh();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        handleTxtChange,
        handleSendComment,
        handleLogout,
        user,
        handleLogin,
        signEmail,
        signPassword,
        setSignEmail,
        setSignPassword,
        comments,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
