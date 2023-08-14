import React, { useState, useEffect } from "react";

const BlogEditor = () => {
  const [draftKey, setDraftKey] = useState("");
  const [draftContent, setDraftContent] = useState("");

  // Function to save the draft to localStorage
  const saveDraft = () => {
    localStorage.setItem(draftKey, draftContent);
  };

  // Function to clear the draft from localStorage
  const clearDraft = () => {
    localStorage.removeItem(draftKey);
    setDraftContent("");
  };

  // Effect to retrieve the draft content when the component mounts
  useEffect(() => {
    const savedDraft = localStorage.getItem(draftKey);
    if (savedDraft) {
      setDraftContent(savedDraft);
    }
  }, [draftKey]);

  // Effect to add event listeners when the component mounts and remove when unmounts
  useEffect(() => {
    const handleBeforeUnload = () => {
      saveDraft();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      saveDraft();
    };
  }, []);

  const handleChange = (event) => {
    const newContent = event.target.value;
    setDraftContent(newContent);
  };

  return (
    <div>
      <h2>Blog Editor</h2>
      <textarea
        value={draftContent}
        onChange={handleChange}
        placeholder="Start writing your blog..."
      />
      <button onClick={clearDraft}>Clear Draft</button>
    </div>
  );
};

export default BlogEditor;
