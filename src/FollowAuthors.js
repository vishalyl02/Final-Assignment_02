import React from "react";

const FollowAuthors = ({ authors, onFollow }) => {
  return (
    <div>
      <h2>Follow Authors</h2>
      {authors.map((author) => (
        <div key={author.id}>
          <p>{author.username}</p>
          <button onClick={() => onFollow(author.id)}>Follow</button>
        </div>
      ))}
    </div>
  );
};

export default FollowAuthors;
