import React, { useEffect, useState } from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { Box, Button } from '@mui/material';
import { box, color, fount, mainbutton } from './style';
import Comments from '../Comments/Comments';
interface Props {
  id: number;
}
const LikeComment = ({id } : Props) => {
  const postId = id;
  const storedUser = localStorage.getItem("user");
  const userdata = storedUser ? JSON.parse(storedUser) : null;
  const userId = userdata?.id;
  const [likesCount, setLikesCount] = React.useState(0);
  const [showComment, setShowComment] = useState(false);
  const addLike = async () => {
    const response = await fetch("api/likes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        post_id: postId,
        user_id: userId,
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    console.log(await response.json());
  };
  const removeLike = async () => {
    const response = await fetch("api/likes", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        post_id: postId,
        user_id: userId,
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    console.log(await response.json());
  };
  const likes = async () => {
    const response = await fetch(`/api/likes/${postId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    setLikesCount(data.data.length);
    console.log(data.data);
  }


  const [isLiked, setIsLiked] = React.useState(false);
  const likeClick = async () => {
    if (!userId) {
      alert("Please Login to view likes");
      return;
    }
    try {
      if (isLiked) {
        await removeLike();
      } else {
        await addLike();
      }
      likes();
      setIsLiked(!isLiked);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    likes();
  }, [])

  return (
    <Box>
      <Box sx={box}>
      <Button onClick={() => { likeClick() }} sx={mainbutton} >
        {isLiked ? <FavoriteIcon sx={color} /> : <FavoriteBorderIcon sx={fount} />}
        {likesCount > 0 ? likesCount : null}
      </Button>
      <Button sx={mainbutton} onClick={() => setShowComment(true)}>
        <ChatBubbleOutlineIcon sx={fount} />
      </Button>
      </Box>
      <Box sx={{
        width : "100"
      }}>
      {showComment && <Comments postId={postId} />}
      </Box>
    </Box>
  )
}

export default LikeComment
