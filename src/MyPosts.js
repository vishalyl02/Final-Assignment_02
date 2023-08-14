import React from "react";
import Blog from "./Blog";

const MyPosts = ({ posts }) => {
  return (
    <div>
      <h2>My Posts</h2>
      {posts.map((post) => (
        <Blog post = {post} />
      ))}
    </div>
  );
};

export default MyPosts;