import React from "react";
import "./UserProfile.css";

const UserProfile = ({ user, onLogout }) => {
  const handleLogout = () => {
    onLogout();
  };

  // Retrieve email from local storage
  const userEmail = localStorage.getItem('userEmail');

  return (
    <div className="user-profile-container">
      {user ? (
        <div className="user-profile">
          <img
            src="https://th.bing.com/th/id/OIP.IA4eyrIMZboDKKZ8RSA8HgHaHa?w=177&h=180&c=7&r=0&o=5&pid=1.7"
            alt="Profile"
            className="profile-picture"
          />
          <h2>Welcome to The Blog !</h2>
          {userEmail && <p>Email: {userEmail}</p>}
          {/* Add more profile information here */}
          <button className="logout-button" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      ) : (
        <p className="login-prompt">Please log in or register</p>
      )}
    </div>
  );
};

export default UserProfile;
