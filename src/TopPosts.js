import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Box,Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';

const TopPosts = () => {
  const [topPosts, setTopPosts] = useState([]);

  const [likedPosts, setLikedPosts] = useState([]);


  const handleLikeClick = (postId) => {
    const updatedLikedPosts = likedPosts.includes(postId)
      ? likedPosts.filter(id => id !== postId)
      : [...likedPosts, postId];
    setLikedPosts(updatedLikedPosts);
    // Update the UI or save the liked posts to local storage
  };
  
  useEffect(() => {
    fetch('http://localhost:5000/api/tops') // Replace with your API endpoint for top posts
      .then(response => response.json())
      .then(data => setTopPosts(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      {topPosts.map((post, index) => (
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
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
      <Avatar sx={{ bgcolor: red[500], marginRight: '8px' }} aria-label="author-avatar">
        {post.author.charAt(0)}
      </Avatar>
      <Typography variant="body2" sx={{ color: '#1976d2' }}>
        Author: {post.author}
      </Typography>
    </div>
   
    <Typography variant="body2" sx={{ color: '#616161', marginBottom: '8px' }}>
      {post.content}
    </Typography>
    <Typography variant="subtitle2" sx={{ color: '#9e9e9e', marginBottom: '8px' }}>
      Date: {post.date}
    </Typography>
    <Button
  variant="contained"
  color={likedPosts.includes(post.id) ? "secondary" : "primary"}
  onClick={() => handleLikeClick(post.id)}
  style={{ marginTop: '10px' }}
>
  {likedPosts.includes(post.id) ? "Liked" : "Like"} 
</Button>
          </CardContent>
        </Card>
      ))}
      {topPosts.length % 3 === 2 && <div style={{ flex: '33.33%' }}></div>}
    </Box>
  );
};

export default TopPosts;
