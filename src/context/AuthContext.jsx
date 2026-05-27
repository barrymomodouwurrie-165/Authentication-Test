import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const Navigate = useNavigate();
  const [signEmail, setSignEmail] = useState("");
  const [signPassword, setSignPassword] = useState("");
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
          Navigate("/contents");
        }
        console.log(user);
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
  return (
    <AuthContext.Provider
      value={{
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
