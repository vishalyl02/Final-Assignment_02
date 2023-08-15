import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';

const RecommendedPosts = () => {
  const [recommendedPosts, setRecommendedPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/suggests') // Replace with your API endpoint for recommended posts
      .then(response => response.json())
      .then(data => setRecommendedPosts(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      {recommendedPosts.map((post, index) => (
        <Card key={post.id} sx={{ width: 'calc(33.33% - 20px)', marginBottom: '20px' }}>
          <CardMedia
            component="img"
            sx={{ height: 200, objectFit: 'cover' }}
            alt={post.title}
            image={post.image_url}
          />
          <CardContent>
          <Typography variant="overline" sx={{ color: '#9e9e9e', marginBottom: '8px' }}>
          {post.topic}
        </Typography>
        <Typography variant="body2" sx={{ color: '#1976d2', display: 'flex', alignItems: 'center' }}>
          <Avatar sx={{ bgcolor: red[500] }} aria-label="author-avatar">
            {post.author.charAt(0)}
          </Avatar>
          <span style={{ marginLeft: '8px' }}>{post.author}</span>
        </Typography>
       
       
        <Typography variant="body2" sx={{ color: '#616161', marginBottom: '8px' }}>
          {post.content}
        </Typography>
        <Typography variant="subtitle2" sx={{ color: '#9e9e9e', marginBottom: '8px' }}>
          Date: {post.date}
        </Typography>
       
          </CardContent>
        </Card>
      ))}
      {recommendedPosts.length % 3 === 2 && <div style={{ flex: '33.33%' }}></div>}
    </Box>
  );
};

export default RecommendedPosts;
