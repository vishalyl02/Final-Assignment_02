// src/components/RegisterForm.js
import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const handleRegister = () => {
    const handleRegister = () => {
      console.log('Form State:', { username, email, password, passwordConfirmation });
      // ... rest of the code
    };
    
    axios.post('/register', { username, email, password, password_confirmation: passwordConfirmation })
      .then(response => {
        // Handle successful registration
        const token = response.data.token;
        // Save the token to local storage or state for authentication
      })
      .catch(error => {
        // Handle registration error
        console.error('Registration failed:', error);
      });
  };

  return (
    <div>
      <h2>Register</h2>
      <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <input type="password" value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)} placeholder="Confirm Password" />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default RegisterForm;
