import React from "react";

const BlogEdit = ({ editedPost, setEditedPost, onCancel, onUpdate }) => {
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      // Use the setter function to update the state
      setEditedPost((prevEditedPost) => ({
        ...prevEditedPost,
        [name]: value,
      }));
    };
  return (
    <div className="new-post">
      <h2>Edit Post</h2>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={editedPost.title}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="topic"
        placeholder="Topic"
        value={editedPost.topic}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="featuredImage"
        placeholder="Featured Image URL"
        value={editedPost.featuredImage}
        onChange={handleInputChange}
      />
      <textarea
        name="text"
        placeholder="Text"
        value={editedPost.text}
        onChange={handleInputChange}
      />
      <input
        type="datetime-local"
        name="dateTime"
        value={editedPost.dateTime}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="author"
        placeholder="Author"
        value={editedPost.author}
        onChange={handleInputChange}
      />
      <button onClick={onUpdate}>Update Post</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default BlogEdit;
