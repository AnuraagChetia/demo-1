import React from "react";
import { useNavigate } from "react-router";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <div>
      <span
        style={{ cursor: "pointer" }}
        onClick={() => {
          navigate("/");
        }}
      >
        Navbar
      </span>
      <button
        onClick={() => {
          navigate("/login");
        }}
      >
        Login
      </button>
    </div>
  );
};

export default NavBar;
