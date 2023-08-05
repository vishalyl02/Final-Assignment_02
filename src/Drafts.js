import React from "react";

const Drafts = () => {
  const drafts = Object.entries(localStorage);

  return (
    <div>
      <h2>Saved Drafts</h2>
      {drafts.map(([key, value]) => (
        <div key={key} className="draft">
          <h3>Draft {key}</h3>
          <p>{value}</p>
        </div>
      ))}
    </div>
  );
};

export default Drafts;
