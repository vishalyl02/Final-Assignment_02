import React, { useState, useEffect } from "react";

const MyItems = () => {
  const [publishedPosts, setPublishedPosts] = useState([]);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("publishedPosts")) || [];
    console.log("Stored Posts:", storedPosts);
    setPublishedPosts(storedPosts);
  }, []);

  return (
    <div>
      <h2>My Items</h2>
      {publishedPosts.map((post, index) => (
        <div key={index} className="post">
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <p>Timestamp: {post.timestamp}</p>
        </div>
      ))}
    </div>
  );
};

export default MyItems;
 