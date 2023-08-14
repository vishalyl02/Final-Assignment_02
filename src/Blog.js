import React from "react";
import "./Blog.css";

const Blog = ({ post }) => {
  return (
    <div className="blog-card">
      <h3 className="blog-title">{post.title}</h3>
      <div className="blog-details">
        <div className="blog-stat">
          <i className="fas fa-thumbs-up"></i> Likes: {post.likes}
        </div>
        <div className="blog-stat">
          <i className="fas fa-comment"></i> Comments: {post.comments}
        </div>
        <div className="blog-stat">
          <i className="fas fa-eye"></i> Views: {post.views}
        </div>
      </div>
    </div>
  );
};

export default Blog;