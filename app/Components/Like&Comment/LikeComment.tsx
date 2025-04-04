import React from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { Button } from '@mui/material';
const LikeComment = () => {
   const [isLiked, setIsLiked] = React.useState(false);
   const likeClick = () => {
     setIsLiked(!isLiked);

   }
  return (
    <div>
      <Button onClick={()=>{likeClick()} }>
        {isLiked? <FavoriteIcon/> : <FavoriteBorderIcon/>}
      </Button>
      <ChatBubbleOutlineIcon/>
    </div>
  )
}

export default LikeComment
