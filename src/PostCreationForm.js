import React, { useState } from "react";
import axios from "axios";
import "./PostCreationForm.css"; // Import your custom CSS file for styling

const PostCreationForm = ({ user }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isDraft, setIsDraft] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSaveDraft = () => {
    setLoading(true);

    const postData = {
      title,
      content,
      isDraft: true,
      userId: user.id, // Assuming the user object has an 'id' property
    };

    axios
      .post("/api/create-post", postData)
      .then((response) => {
        // Handle success, e.g., show a notification to the user
        console.log("Post saved as draft");
      })
      .catch((error) => {
        console.error("Error saving draft:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handlePublishPost = () => {
    setLoading(true);

    const postData = {
      title,
      content,
      isDraft: false,
      userId: user.id, // Assuming the user object has an 'id' property
    };

    axios
      .post("/api/create-post", postData)
      .then((response) => {
        // Handle success, e.g., show a notification to the user
        console.log("Post published");
      })
      .catch((error) => {
        console.error("Error publishing post:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="post-creation-form">
      <h2>Create a New Post</h2>
      {/* ...rest of the component */}
      <div className="button-group">
        <button
          className="save-draft-button"
          onClick={handleSaveDraft}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Draft"}
        </button>
        <button
          className="publish-button"
          onClick={handlePublishPost}
          disabled={loading}
        >
          {loading ? "Publishing..." : "Publish"}
        </button>
      </div>
    </div>
  );
};

export default PostCreationForm;
