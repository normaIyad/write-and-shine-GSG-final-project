import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Avatar,
  Box,
  Divider,
  TextField,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { Favorite, Comment, MoreVert } from "@mui/icons-material";

interface CommentType {
  id: number;
  user: string;
  text: string;
}

interface BlogCardProps {
  title: string;
  content: string;
  likes: number;
  comments: CommentType[];
  onDelete: () => void; // Function to handle blog deletion
}

const BlogCard= (CProps:BlogCardProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    CProps.onDelete();
    handleMenuClose();
  };

  return (
    <Card sx={{ marginBottom: 3, boxShadow: 2, borderRadius: 2, position: "relative" }}>
      {/* Options Menu Icon */}
      <IconButton
        onClick={handleMenuOpen}
        sx={{ position: "absolute", top: 10, right: 10 }}
        aria-label="options"
      >
        <MoreVert />
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
        <MenuItem onClick={handleDelete}>Delete Blog</MenuItem>
      </Menu>

      <CardContent>
        <Typography variant="h5" fontWeight="bold" gutterBottom color="#1976d2">
          {CProps.title}
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ marginBottom: 2 }}>
          {CProps.content}
        </Typography>
      </CardContent>

      <CardActions sx={{ paddingX: 2, paddingBottom: 1 }}>
        <Box display="flex" justifyContent="space-between" width="100%">
          <Button size="small" startIcon={<Favorite />} color="primary">
            {CProps.likes} Likes
          </Button>
          <Button size="small" startIcon={<Comment />} color="primary">
            {CProps.comments.length} Comments
          </Button>
        </Box>
      </CardActions>

      <Divider />
      <Box sx={{ padding: 2 }}>
        <Typography variant="subtitle1" color="primary" gutterBottom>
          Comments
        </Typography>
        {CProps.comments.length > 0 ? (
          CProps.comments.map((comment) => (
            <Box key={comment.id} display="flex" alignItems="flex-start" marginBottom={2}>
              <Avatar sx={{ marginRight: 2 }}>{comment.user.charAt(0)}</Avatar>
              <Box>
                <Typography variant="subtitle2" fontWeight="bold">
                  {comment.user}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {comment.text}
                </Typography>
              </Box>
            </Box>
          ))
        ) : (
          <Typography variant="body2" color="textSecondary">
            No comments yet.
          </Typography>
        )}
        <Box display="flex" alignItems="center" marginTop={2}>
          <TextField
            variant="outlined"
            placeholder="Write a comment..."
            size="small"
            fullWidth
            sx={{ marginRight: 1 }}
          />
          <Button variant="contained" color="primary">
            Post
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default BlogCard;