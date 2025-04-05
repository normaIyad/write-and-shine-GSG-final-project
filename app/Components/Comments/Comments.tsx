import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button, Card, CardContent, AlertTitle, Alert } from '@mui/material';

interface IComment {
  id: number;
  content: string;
}

interface Props {
  postId: number;
}

const Comments = ({ postId }: Props) => {
  const [data, setData] = useState<IComment[]>([]);
  const [newComment, setNewComment] = useState('');
 const [alerts, setAlert] = useState<{
    type: "success" | "info" | "warning" | "error";
    message: string;
  } | null>(null);
  const userId = 2;
  const getCommts = ()=>{
    fetch(`/api/comments/${postId}`)
     .then((response) => response.json())
     .then((data) => setData(data.data));
  }
  // const userId = parseInt(localStorage.getItem('userId')!);
  useEffect(() => {
    getCommts();
  }, [postId]);

  const handleCommentSubmit = async () => {
    if (!newComment) {
      setAlert({
        type: 'error',
        message: 'Please enter a comment.',
      });
    }
    if(newComment.length < 3){
      setAlert({
        type: 'warning',
        message: 'Comment should be at least 3 characters long.',
      });
      return;
    }
    if (newComment) {
      const newCommentObj = { 
        post_id : postId, 
        user_id : userId  , 
        content : newComment
       };
      const response = await fetch("api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCommentObj),
      });
      setNewComment('');
      if (response.ok) {
        setAlert({
          type:'success',
          message: 'Comment posted successfully.',
        });
        getCommts();
      }
    }
  };

  return (
    <Box
      sx={{
        padding: 2,
        backgroundColor: '#f3f4f6',
        borderRadius: '8px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        margin: '0 auto',
      }}
    >
       {alerts && (
              <Alert
                severity={alerts.type}
                onClose={() => setAlert(null)}
                sx={{
                  position: "absolute",
                  top: "20%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "90%",
                  boxShadow: "0 6px 15px rgba(0, 100, 255, 0.3)",
                  borderRadius: "12px",
                  backgroundColor: alerts.type === "success" ? "#e0f7e9" : alerts.type === "error" ? "#fbe4e4" : alerts.type === "warning" ? "#fff7e5" : "#e3f2fd", // Dynamic background colors
                  color: alerts.type === "success" ? "#2e7d32" : alerts.type === "error" ? "#c62828" : alerts.type === "warning" ? "#ed6c02" : "#0277bd", // Matching text colors
                  cursor: "pointer",
                  zIndex: 100,
                  textAlign: "center",
                  padding: "16px",
                  fontSize: "1rem",
                }}
              >
                <AlertTitle>
                  {alerts.type.charAt(0).toUpperCase() + alerts.type.slice(1)}
                </AlertTitle>
                {alerts.message}
              </Alert>
            )}
      <Typography
        variant="h6"
        sx={{
          marginBottom: 2,
          fontWeight: 'bold',
          color: '#333',
          textAlign: 'center',
        }}
      >
        Comments
      </Typography>

      {data.length === 0 ? (
        <Typography
          variant="body1"
          sx={{
            textAlign: 'center',
            color: 'textSecondary',
          }}
        >
          No comments yet. Be the first to comment!
        </Typography>
      ) : (
        data.map((comment) => (
          <Card
            key={comment.id}
            sx={{
              marginBottom: 2,
              border: '1px solid #ccc',
              borderRadius: '8px',
              backgroundColor: '#fff',
            }}
          >
            <CardContent>
              <Typography variant="body2" sx={{ color: '#333' }}>
                {comment.content}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginTop: 2,
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          sx={{
            flex: 1,
            marginRight: 1,
            backgroundColor: '#fff',
          }}
        />
        <Button
          variant="contained"
          onClick={handleCommentSubmit}
          sx={{
            backgroundColor: '#1976d2',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#1565c0',
            },
          }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default Comments;