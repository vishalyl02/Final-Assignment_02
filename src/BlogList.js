  import React, { useState, useEffect } from 'react';
  import { Card, CardContent, CardMedia, Typography, Box, Button } from '@mui/material';
  import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
 import TopPosts from './TopPosts';
import RecommendedPosts from './RecommendedPosts';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import { useLocation } from 'react-router-dom';

  const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const location = useLocation();
    const [likedPosts, setLikedPosts] = useState([]);


    const handleLikeClick = (postId) => {
      const updatedLikedPosts = likedPosts.includes(postId)
        ? likedPosts.filter(id => id !== postId)
        : [...likedPosts, postId];
      setLikedPosts(updatedLikedPosts);
      // Update the UI or save the liked posts to local storage
    }

    const handleBookmarkClick = (postId) => {
        // Get the bookmarks from local storage
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
      
        // Check if the post is already bookmarked
        const existingBookmark = bookmarks.find(post => post.id === postId);
      
        if (existingBookmark) {
          // Post is already bookmarked, remove it from bookmarks
          const updatedBookmarks = bookmarks.filter(post => post.id !== postId);
          localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
        } else {
          // Post is not bookmarked, add it to bookmarks
          const postToBookmark = blogs.find(post => post.id === postId);
          if (postToBookmark) {
            bookmarks.push(postToBookmark);
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
          }
        }
      
        // Force a re-render or update the UI to reflect the change
        // You can use a state update here if you're using a state management library
      };
      



    useEffect(() => {
      fetch('http://localhost:5000/api/writes')
        .then(response => response.json())
        .then(data => setBlogs(data))
        .catch(error => console.error('Error fetching data:', error));
    }, []);
   
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/top-posts">Top Posts</Link>
              </li>
              <li>
                <Link to="/recommended-posts">Recommended Posts</Link>
              </li>
              <li>
                <Link to="/all">All</Link>
              </li>
            </ul>
          </nav>
  
          {location.pathname === '/' && (
        <div>
          <h1 style={{ fontSize: '2.5em', textAlign: 'center', margin: '20px 0', color: '#1976d2' }}>
            Welcome to Creative Writing
          </h1>
        </div>
      )}
       
          <Route path="/top-posts">
            <TopPosts />
          </Route>
  
          <Route path="/recommended-posts">
            <RecommendedPosts />
          </Route>
  
          <Route path="/all">
            <h2>All Posts</h2>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '20px' }}>
      {blogs.map(blog => (
        <Card key={blog.id} sx={{ width: 'calc(33.33% - 20px)', marginBottom: '20px' }}>
          <CardMedia
            component="img"
            sx={{ height: 200, objectFit: 'cover' }}
            alt={blog.title}
            image={blog.image_url}
          />
          <CardContent>
            <Typography variant="overline" sx={{ color: '#9e9e9e', marginBottom: '8px' }}>
              {blog.topic}
            </Typography>
            <Typography variant="body2" sx={{ color: '#1976d2', display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="author-avatar">
                      {blog.author.charAt(0)}
                    </Avatar>
                    <span style={{ marginLeft: '8px' }}>{blog.author}</span>
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#616161', marginBottom: '8px' }}>
              {blog.content}
            </Typography>
            <Typography variant="subtitle2" sx={{ color: '#9e9e9e', marginBottom: '8px' }}>
              Date: {blog.date}
            </Typography>
            <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleBookmarkClick(blog.id)}
                    style={{ marginTop: '10px' }}
                  >
                    Save
                  </Button>
                 <Button
  variant="contained"
  color={likedPosts.includes(blog.id) ? "secondary" : "primary"}
  onClick={() => handleLikeClick(blog.id)}
  style={{ marginTop: '10px' }}
>
  {likedPosts.includes(blog.id) ? "Liked" : "Like"} 
</Button>


          </CardContent>
        </Card>
      ))}
    </Box>
          </Route>
        </div>
      </Router>
    );
  };
  
  export default BlogList;
  







