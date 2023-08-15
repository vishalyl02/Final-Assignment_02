import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Avatar ,Button} from '@mui/material';
import { red } from '@mui/material/colors';

const ViewBookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    setBookmarks(savedBookmarks);
  }, []);

  const handleClearBookmarks = () => {
    // Clear bookmarks from local storage
    localStorage.removeItem('bookmarks');
    setBookmarks([]);
  };


  return (
    <div>
      <h2>Saved Posts</h2>
      <Button variant="outlined" color="secondary" onClick={handleClearBookmarks}>
        Clear All Bookmarks
      </Button>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '20px' }}>
        {bookmarks.map(bookmark => (
          <Card key={bookmark.id} sx={{ width: 'calc(33.33% - 20px)', marginBottom: '20px' }}>
            <CardMedia
              component="img"
              sx={{ height: 200, objectFit: 'cover' }}
              alt={bookmark.title}
              image={bookmark.image_url}
            />
            <CardContent>
              <Typography variant="overline" sx={{ color: '#9e9e9e', marginBottom: '8px' }}>
                {bookmark.topic}
              </Typography>
              <Typography variant="body2" sx={{ color: '#1976d2', display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: red[500] }} aria-label="author-avatar">
                  {bookmark.author.charAt(0)}
                </Avatar>
                <span style={{ marginLeft: '8px' }}>{bookmark.author}</span>
              </Typography>
              <Typography variant="body2" sx={{ color: '#616161', marginBottom: '8px' }}>
                {bookmark.content}
              </Typography>
              <Typography variant="subtitle2" sx={{ color: '#9e9e9e', marginBottom: '8px' }}>
                Date: {bookmark.date}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </div>
  );
};

export default ViewBookmarks;