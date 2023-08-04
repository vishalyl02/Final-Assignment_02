import React, { useState } from "react";
import axios from "axios";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/register", formData); // Replace with your backend API endpoint for user registration
      console.log(response.data); // Handle success or error messages from the backend
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        onChange={handleChange}
        value={formData.username}
      />
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
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
