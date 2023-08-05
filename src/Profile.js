import React from "react";

const Profile = ({ user }) => {
  return (
    <div>
      <h2>Profile</h2>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      {/* Add more profile information as needed */}
    </div>
  );
};

export default Profile;
