import React from "react";

const MyPosts = ({ posts }) => {
  return (
    <div>
      <h2>My Posts</h2>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>Likes: {post.likes}</p>
          <p>Comments: {post.comments}</p>
          <p>Views: {post.views}</p>
          {/* Add more post details as needed */}
        </div>
      ))}
    </div>
  );
};

export default MyPosts;
