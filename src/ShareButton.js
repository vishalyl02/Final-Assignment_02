import React, { useState } from "react";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import Box from "@mui/material/Box";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
// Add more icons as needed

const ShareButton = ({ postTitle }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleShareClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleShareClose = () => {
    setAnchorEl(null);
  };

  const shareOnPlatform = (platform) => {
    switch (platform) {
      case "whatsapp":
        window.open(`https://wa.me/?text=Check out this post: ${postTitle}`);
        break;
      case "facebook":
        // Replace this with actual Facebook sharing logic
        // window.open(`https://www.facebook.com/sharer/sharer.php?u=${yourUrl}`);
        break;
      // Add more cases for other platforms
      default:
        break;
    }

    handleShareClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? "share-popover" : undefined;

  return (
    <div>
      <Button onClick={handleShareClick}>Share</Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleShareClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Box p={2}>
          <Button
            onClick={() => shareOnPlatform("whatsapp")}
            startIcon={<WhatsAppIcon />}
          >
            Share on WhatsApp
          </Button>
          <Button
            onClick={() => shareOnPlatform("facebook")}
            startIcon={<FacebookIcon />}
          >
            Share on Facebook
          </Button>
          {/* Add more share options */}
        </Box>
      </Popover>
    </div>
  );
};

export default ShareButton;
