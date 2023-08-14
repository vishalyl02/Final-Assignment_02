import React, { useState } from 'react';
import axios from 'axios';
import AuthForm from './AuthForm'; // Adjust the path as needed
import "./Form.css"

function RegistrationForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleRegistration = async () => {
    try {
      await axios.post('http://localhost:5000/registration', { customer: { email, password } });
      setRegistrationSuccess(true); // Set registration success state
    } catch (error) {
      // Registration error handling
    }
  };

  return (
    <AuthForm
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      buttonText="Register"
      onSubmit={handleRegistration}
      message={registrationSuccess ? 'Registration successful! You can now log in.' : ''}
    />
  );
}

export default RegistrationForm;
