import React from "react";

const Category = ({ name, articles }) => {
  return (
    <div>
      <h2>{name}</h2>
      {articles.map((article) => (
        <div key={article.id} className="article">
          <h3>{article.title}</h3>
          <p>{article.content}</p>
          <p>Author: {article.author}</p>
          <p>Reading Time: {article.readingTime}</p> {/* Display the reading time */}
        </div>
      ))}
    </div>
  );
};

export default Category;
