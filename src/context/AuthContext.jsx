/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userData")) || null,
  );
  const navigate = useNavigate();
  const [signEmail, setSignEmail] = useState("");
  const [signPassword, setSignPassword] = useState("");

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
          console.log(response.data);
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
      setUser({});
      localStorage.clear();
      navigate("/");
    } catch (error) {
      const message = error;
      console.log(message);
    }
  };
  useEffect(() => {
    const checkRefresh = async () => {
      const result = await axios.post(
        "http://localhost:5000/api/users/refresh_token",
      );
      setUser((prev) => ({ ...prev, accessToken: result.data.accessToken }));
      console.log(result.data);
    };
    checkRefresh();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        handleLogout,
        user,
        handleLogin,
        signEmail,
        signPassword,
        setSignEmail,
        setSignPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
