import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/category/science">Science</Link>
        </li>
        <li>
          <Link to="/category/business">Business</Link>
        </li>
        <li>
          <Link to="/category/art">Art</Link>
        </li>
        <li>
          <Link to="/category/music">Music</Link>
        </li>
        <li>
          <Link to="/category/nature">Nature</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
