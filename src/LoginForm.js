import React, { useState } from "react";
import axios from "axios";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", formData); // Replace with your backend API endpoint for user login
      console.log(response.data); // Handle success or error messages from the backend
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        onChange={handleChange}
        value={formData.email}
      />
      <input
        type="password"
        name="password"
        onChange={handleChange}
        value={formData.password}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
