// src/components/LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    axios.post('/login', { username, password })
      .then(response => {
        // Handle successful login
        const token = response.data.token;
        // Save the token to local storage or state for authentication
      })
      .catch(error => {
        // Handle login error
        console.error('Login failed:', error);
      });
  };

  return (
    <div>
      <h2>Login</h2>
      <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginForm;
