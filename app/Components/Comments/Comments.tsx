"use client";
import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button, Card, CardContent, AlertTitle, Alert } from '@mui/material';
import { useUserStore } from '@/app/store/useUserStore';

interface IComment {
  id: number;
  user_id: number;
  author_name: string;
  content: string;
}

interface Props {
  postId: number;
}

const Comments = ({ postId }: Props) => {
    const { isLogin, userData  } = useUserStore();
  const userId = userData?.userId;
  const [data, setData] = useState<IComment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
 const [alerts, setAlert] = useState<{
    type: "success" | "info" | "warning" | "error";
    message: string;
  } | null>(null);
  const getCommts = ()=>{
    fetch(`/api/comments/${postId}`)
     .then((response) => response.json())
     .then((data) => {
      setData(data.data);
      fetchUsernames(data.data); 
      setLoading(false);
    });
  }
  const fetchUsernames = async (comments: IComment[]) => {
    const updatedComments = await Promise.all(
      comments.map(async (comment) => {
        if (!comment.author_name) {
          try {
            const res = await fetch(`api/user/${comment.user_id}`);
            const userData = await res.json();
            comment.author_name = userData[0]?.username || "Unknown";
          } catch (err) {
            console.error("Error fetching username", err);
            comment.author_name = "Unknown";
          }
        }
        return comment;
      })
    );
    setData(updatedComments);
  };
  useEffect(() => {
    getCommts();
  }, [postId]);

  const handleCommentSubmit = async () => {
    if(!isLogin){
      setAlert({
        type: 'error',
        message: 'Please log in ',
      });
    }
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
        {alerts && (
              <Alert
                severity={alerts.type}
                onClose={() => setAlert(null)}
                sx={{
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
      </Typography>

      {
      loading ? (
        <Typography variant="body1" sx={{ textAlign: 'center', color: 'textSecondary' }}>
          Loading comments...
        </Typography>
      ) :
      data.length === 0 ? (
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
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {comment.author_name || 'Loading...'}
              </Typography>
              <Typography variant="body2" sx={{ color: '#333' }}>
                {comment.content}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}
{isLogin && <Box
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
          disabled={loading || !newComment.trim()}
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
      </Box>}
    </Box>
  );
};

export default Comments;