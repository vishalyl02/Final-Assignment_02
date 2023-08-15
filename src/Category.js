import React from "react";
import { Grid, Card, CardContent, Typography, CardActions, Button, CardMedia } from "@mui/material";
import ShareButton from "./ShareButton"; // Make sure to import the ShareButton component
import "./Category.css";

const Category = ({ name, articles, images }) => {
  return (
    <div className="category">
      <h2 className="category-title">{name}</h2>
      <div className="articles">
        <Grid container spacing={3}> {/* Use Grid container */}
          {articles.map((article, index) => (
            <Grid item xs={12} sm={6} md={4} key={article.id}>
              <Card className="article-card">
                {images.length > index && (
                  <CardMedia
                    component="img"
                    height="140"
                    image={images[index].url}
                    alt={`${name} ${index + 1}`}
                  />
                )}
                <CardContent>
                  <Typography variant="h6" component="h3">
                    {article.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {article.content}
                  </Typography>
                </CardContent>
                <CardActions>
                  {/* <Button size="small" color="primary">
                    Read More
                  </Button> */}
                  <ShareButton postTitle={article.title} />
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default Category;
