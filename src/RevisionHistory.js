import React, { useState, useEffect } from "react";
import axios from "axios";

const RevisionHistory = ({ post, onClose }) => {
  const [revisions, setRevisions] = useState([]);

  useEffect(() => {
    fetchRevisions(post.id);
  }, [post.id]);

  const fetchRevisions = (postId) => {
    axios
      .get(`/api/post/${postId}/revisions`)
      .then((response) => {
        setRevisions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching revisions:", error);
      });
  };

  return (
    <div className="revision-history">
      <h2>Revision History for "{post.title}"</h2>
      <ul>
        {revisions.map((revision) => (
          <li key={revision.revision_id}>
            <div className="revision-info">
              <p>Revision ID: {revision.revision_id}</p>
              <p>Created at: {revision.created_at}</p>
            </div>
            <button>View</button>{" "}
            {/* Implement a view revision functionality */}
          </li>
        ))}
      </ul>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default RevisionHistory;
