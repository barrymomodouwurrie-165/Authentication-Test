import HomePage from "./pages/HomePage.jsx";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ContentsPage from "./pages/ContentsPage";
import { Routes, Route } from "react-router";
import "./App.css"
import "./pages/SignupPage.css"
import "./pages/LoginPage.css"
// import { useState } from "react";

function App() {
  // const [user, setUser] = useState({})
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/contents" element={<ContentsPage />} />
      </Routes>
    </>
  );
}

export default App;
