import React, { useState } from "react";
import {
  Button,
  TextField,
  TextareaAutosize,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

function AfterComponent() {
  const [drafts, setDrafts] = useState(
    JSON.parse(localStorage.getItem("afterPosts")) || []
  );

  const handleInputChange = (index, field, value) => {
    const updatedDrafts = [...drafts];
    updatedDrafts[index][field] = value;
    setDrafts(updatedDrafts);
  };

  const clearDraft = (index) => {
    const updatedDrafts = [...drafts];
    updatedDrafts.splice(index, 1);
    setDrafts(updatedDrafts);
    localStorage.setItem("afterPosts", JSON.stringify(updatedDrafts));
  };

  const clearAllDrafts = () => {
    setDrafts([]);
    localStorage.removeItem("afterPosts");
  };

  return (
    <div>
      <h2>After Posts</h2>
      <Button variant="outlined" color="secondary" onClick={clearAllDrafts}>
        Clear All Drafts
      </Button>
      <List>
        {drafts.map((draft, index) => (
          <ListItem key={index} className="draft-item">
            <ListItemText>
              <TextField
                label="Title"
                variant="outlined"
                value={draft.title}
                onChange={(e) => handleInputChange(index, "title", e.target.value)}
              />
              <TextField
                label="Topic"
                variant="outlined"
                value={draft.topic}
                onChange={(e) => handleInputChange(index, "topic", e.target.value)}
              />
              <TextField
                label="Featured Image URL"
                variant="outlined"
                value={draft.featuredImage}
                onChange={(e) => handleInputChange(index, "featuredImage", e.target.value)}
              />
              <TextareaAutosize
                minRows={3}
                placeholder="Text"
                value={draft.text}
                onChange={(e) => handleInputChange(index, "text", e.target.value)}
              />
              <TextField
                type="datetime-local"
                label="Date and Time"
                variant="outlined"
                value={draft.dateTime}
                onChange={(e) => handleInputChange(index, "dateTime", e.target.value)}
              />
              <TextField
                label="Author"
                variant="outlined"
                value={draft.author}
                onChange={(e) => handleInputChange(index, "author", e.target.value)}
              />
              <Button
                variant="outlined"
                color="primary"
                onClick={() => clearDraft(index)}
              >
                Clear Draft
              </Button>
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default AfterComponent;
