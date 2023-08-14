import React from 'react';

const AuthForm = ({ email, setEmail, password, setPassword, buttonText, onSubmit, message }) => {
  return (
    <div className="login-form-container">
      <div className="input-grid">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="input-field"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="input-field"
        />
      </div>
      <button onClick={onSubmit} className="login-button">
        {buttonText}
      </button>
      <p className="login-message">{message}</p>
    </div>
  );
};

export default AuthForm;
