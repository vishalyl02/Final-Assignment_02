import React, { useState } from "react";


const PostCreationForm = ({ user }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
 
  const [isDraft, setIsDraft] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSaveDraft = () => {
    setLoading(true);

    const draftData = {
      title,
      content,

      isDraft: true,
  // Assuming the user object has a 'name' property
      timestamp: new Date().toISOString(),
    };

    const drafts = JSON.parse(localStorage.getItem("drafts")) || [];
    drafts.push(draftData);
    localStorage.setItem("drafts", JSON.stringify(drafts));

    // Handle success, e.g., show a notification to the user
    console.log("Post saved as draft");

    setLoading(false);
  };

  const handlePublishPost = () => {
    setLoading(true);

    const postData = {
      title,
      content,
 
      isDraft: false,
     
      timestamp: new Date().toISOString(),
    };

    const publishedPosts =
      JSON.parse(localStorage.getItem("publishedPosts")) || [];
    publishedPosts.push(postData);
    localStorage.setItem("publishedPosts", JSON.stringify(publishedPosts));

    // Handle success, e.g., show a notification to the user
    console.log("Post published");

    setLoading(false);
  };

  return (
    <div className="post-creation-form">
      <h2>Create a New Post</h2>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
     
      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={isDraft}
            onChange={() => setIsDraft(!isDraft)}
          />
          Save as Draft
        </label>
      </div>
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
