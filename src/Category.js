import React from "react";

const Category = ({ name, articles }) => {
  return (
    <div className="category">
      <h2>{name}</h2>
      {articles.map((article) => (
        <div key={article.id} className="article">
          <h3>{article.title}</h3>
          <p>{article.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Category;
