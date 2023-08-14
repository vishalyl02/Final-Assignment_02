import React from "react";
import { Link } from "react-router-dom";
import "./Navstyle.css"



const NavigationLinks = ({ user, categories}) => {
  return (
    <nav className="navigation">
     <div className="logo">
        <Link to="/">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6Fj6xD0EjTroat68IGNh9FyCgWa4t6UJaQw&usqp=CAU"
          alt="Logo"
            className="logo-image"
          />
        </Link>
      </div>
      <ul className="navigation-links">
        <li>
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/all-posts" className="nav-link">
            All Posts
          </Link>
            </li>

        {user ? (
          <>
            <li>
              <Link to="/userProfile" className="nav-link">
                User Profile
              </Link>
              </li>
              <li>
              <Link to="/create-post" className="nav-link">
                PostCreationForm
              </Link>
              </li>
         
            <li>
              <Link to="/my-posts" className="nav-link">
                My Posts
              </Link>
            </li>
            <li>
          <Link to="/saved-posts" className="nav-link">
            View Saved Posts
          </Link>
        </li>
        <li>
          <Link to="/drafts" className="nav-link">
            Draft
          </Link>
        </li>
            <li>
              <Link to="/follow-authors" className="nav-link">
                Follow Authors
              </Link>
              </li>
              <li>
              <Link to="/pricing" className="nav-link">
                Pricing
              </Link>
              
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </li>
            <li>
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
          </>
        )}
        {categories.map((category) => (
          <li key={category}>
            <Link to={`/category/${category}`} className="nav-link">
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Link>
          </li>
        ))}
             
        
      </ul>
    </nav>
  );
};

export default NavigationLinks;
