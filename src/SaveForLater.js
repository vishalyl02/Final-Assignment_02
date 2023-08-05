import React from "react";

const SaveForLater = ({ savedPosts, onDelete, onEdit }) => {
  return (
    <div>
      <h2>Saved Posts</h2>
      {savedPosts.map((post) => (
        <div key={post.id} className="post">
          <h2>{post.title}</h2>
          <p>Topic: {post.topic}</p>
          <img src={post.featuredImage} alt="Featured" />
          <p>{post.text}</p>
          <p>Date: {post.dateTime}</p>
          <p>Author: {post.author}</p>
          <p>Likes: {post.likes}</p>
          <p>Comments: {post.comments}</p>
          <button onClick={() => onEdit(post)}>Edit</button>
          <button onClick={() => onDelete(post.id)}>Delete Post</button>
        </div>
      ))}
    </div>
  );
};

export default SaveForLater;
