"use client";
import React, { useEffect, useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { Box, Button } from '@mui/material';
import { box, color, fount, mainbutton } from './style';
import Comments from '../Comments/Comments';
import { useUserStore } from '@/app/store/useUserStore';

interface Props {
  id: number;
  like_count: number;
}

const LikeComment = ({ id, like_count }: Props) => {
  const postId = id;
  const { isLogin, userData } = useUserStore();
  const [hasMounted, setHasMounted] = useState(false);
  const [likesCount, setLikesCount] = useState(like_count || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [showComment, setShowComment] = useState(false);

  const addLike = async () => {
    const response = await fetch("/api/likes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        post_id: postId,
        user_id: userData?.userId,
      }),
    });
    if (!response.ok) throw new Error("Failed to add like");
  };

  const removeLike = async () => {
    const response = await fetch("/api/likes", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        post_id: postId,
        user_id: userData?.userId,
      }),
    });
    if (!response.ok) throw new Error("Failed to remove like");
  };

  const refreshLikes = async () => {
    const response = await fetch(`/api/likes/${postId}`);
    if (!response.ok) throw new Error("Failed to fetch likes");

    const data = await response.json();

    const hasLiked = data.data.some(
      (like: any) => like.user_id === userData?.userId
    );

    setIsLiked(hasLiked);
    setLikesCount(data.data.length);
  };

  const likeClick = async () => {
    if (!isLogin) {
      alert("Please Login to view likes");
      return;
    }
    try {
      if (isLiked) {
        await removeLike();
      } else {
        await addLike();
      }
      await refreshLikes();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    refreshLikes();
  }, [postId, userData?.userId]);
  useEffect(() => {
    setHasMounted(true); 
  }, []);
  if (!hasMounted) return null;
  return (
    <Box>
      <Box sx={box}>
        <Button onClick={likeClick} sx={mainbutton}>
          {isLiked ? <FavoriteIcon sx={color} /> : <FavoriteBorderIcon sx={fount} />}
          {likesCount > 0 ? likesCount : null}
        </Button>
        <Button sx={mainbutton} onClick={() => setShowComment(true)}>
          <ChatBubbleOutlineIcon sx={fount} />
        </Button>
      </Box>
      <Box sx={{ width: "100%" }}>
        {showComment && <Comments postId={postId} />}
      </Box>
    </Box>
  );
};

export default LikeComment;


