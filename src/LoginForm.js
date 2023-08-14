import React, { useState } from 'react';
import axios from 'axios';
import AuthForm from './AuthForm'; // Adjust the path as needed
import "./Form.css"

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

  const handleLogin = async () => {
    try {
      await axios.post('http://localhost:5000/check', { email, password });
      setLoginMessage('Login successful');
      onLogin(); // Call the onLogin function to update user state in App.js
    } catch (error) {
      setLoginMessage('Login failed');
    }
  };

  return (
    <AuthForm
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      buttonText="Log In"
      onSubmit={handleLogin}
      message={loginMessage}
    />
  );
}

export default LoginForm;
