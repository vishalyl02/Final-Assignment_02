import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Button, Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [followedAuthors, setFollowedAuthors] = useState([]);
  const [showFollowedAuthors, setShowFollowedAuthors] = useState(false);

  useEffect(() => {
    // Load followed authors from local storage on initial render
    const storedFollowedAuthors = localStorage.getItem('followedAuthors');
    if (storedFollowedAuthors) {
      setFollowedAuthors(JSON.parse(storedFollowedAuthors));
    } else {
      setFollowedAuthors([]); // Initialize with an empty array
    }

    fetch('http://localhost:5000/api/writes')
      .then(response => response.json())
      .then(data => setBlogs(data.map(blog => ({ ...blog, followed: false }))))
      .catch(error => console.error('Error fetching data:', error));
  }, []);


  const clearFollowedAuthorsLocalStorage = () => {
    localStorage.removeItem('followedAuthors');
    setFollowedAuthors([]);
  };

  const handleLogout = () => {
    // Perform logout actions
    clearFollowedAuthorsLocalStorage(); // Clear followed authors from local storage
  }


  useEffect(() => {
    // Update local storage when followed authors change
    localStorage.setItem('followedAuthors', JSON.stringify(followedAuthors));
  }, [followedAuthors]);

  const handleFollowClick = (id, author) => {
    setBlogs(prevBlogs =>
      prevBlogs.map(blog =>
        blog.id === id ? { ...blog, followed: !blog.followed } : blog
      )
    );

    if (followedAuthors.includes(author)) {
      setFollowedAuthors(prevFollowedAuthors =>
        prevFollowedAuthors.filter(followedAuthor => followedAuthor !== author)
      );
    } else {
      setFollowedAuthors(prevFollowedAuthors => [...prevFollowedAuthors, author]);
    }
  };

  const handleShowFollowedAuthorsClick = () => {
    setShowFollowedAuthors(true);
  };

  const handleCloseFollowedAuthorsDialog = () => {
    setShowFollowedAuthors(false);
  };
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '20px' }}>
      <Button onClick={handleLogout} sx={{ position: 'fixed', bottom: '60px', right: '20px' }}>
        UnFollow All Authors
      </Button>
      <Button onClick={handleShowFollowedAuthorsClick} sx={{ position: 'fixed', bottom: '20px', right: '20px' }}>
        Show Followed Authors
      </Button>
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
              variant="outlined"
              onClick={() => handleFollowClick(blog.id, blog.author)}
              sx={{ marginTop: '8px' }}
            >
              {blog.followed ? 'Followed' : 'Follow'}
            </Button>
          </CardContent>
        </Card>
      ))}
      <Dialog open={showFollowedAuthors} onClose={handleCloseFollowedAuthorsDialog}>
        <DialogTitle>Followed Authors</DialogTitle>
        <DialogContent>
          <List>
            {followedAuthors.map((author, index) => (
              <ListItem key={index}>
                <ListItemText primary={author} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default BlogList;