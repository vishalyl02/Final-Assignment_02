import React from "react";
import "./Drafts.css"; // Import the external CSS file

const Drafts = () => {
  const drafts = Object.entries(localStorage);

  return (
    <div className="drafts-container">
      <div className="heading-container">
        <h2>Revision History</h2>
      </div>
      <div className="content-container">
        {drafts.map(([key, value]) => (
          <div key={key} className="draft">
            <h3>Revision History: {key}</h3>
            <p>{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Drafts;
