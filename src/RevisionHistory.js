import React, { useState } from "react";

const RevisionHistory = () => {
  // Load revision history from local storage or initialize as empty array
  const [revisionHistory, setRevisionHistory] = useState(
    JSON.parse(localStorage.getItem("revisionHistory")) || []
  );

  return (
    <div>
      <h2>Revision History</h2>
      {revisionHistory.map((revision, index) => (
        <div key={index} className="revision">
          <h3>Version {index + 1}</h3>
          <p>Date: {revision.timestamp}</p>
          <p>Author: {revision.author}</p>
          <p>Changes: {revision.changes}</p>
        </div>
      ))}
    </div>
  );
};

export default RevisionHistory;
