import axios from "axios";
import React, { useState } from "react";

const LOGIN_FIELDS = [
  { name: "email", label: "Email", type: "email" },
  { name: "password", label: "Password", type: "password" },
];

const SIGNUP_FIELDS = [
  { name: "email", label: "Email", type: "email" },
  { name: "firstName", label: "First Name", type: "text" },
  { name: "lastName", label: "Last Name", type: "text" },
  { name: "phone", label: "Phone", type: "tel" },
  { name: "role", label: "Role", type: "text" },
  { name: "password", label: "Password", type: "password" },
  { name: "confirmPassword", label: "Confirm Password", type: "password" },
];

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Form Data:", formData);
      if (isLogin) {
        const res = await axios.post(
          "http://localhost:4000/user/login",
          formData
        );
        console.log(res);
        return;
      }
      const res = await axios.post(
        "http://localhost:4000/user/signup",
        formData
      );
      console.log(res);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {(isLogin ? LOGIN_FIELDS : SIGNUP_FIELDS).map((field) => (
          <div key={field.name}>
            <label>{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleChange}
            />
          </div>
        ))}
        <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
      </form>

      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin
          ? "Don't have an account? Sign Up"
          : "Already have an account? Login"}
      </button>
    </>
  );
};

export default Auth;
