import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import ReadMore from "./ReadMore";
import img from "@/public/Account_user/account_circle.svg";

import LikeComment from "../Like&Comment/LikeComment";

interface PlogProps {
  id: number;
  content: string;
  title: string;
  author_id: number;
  like_count: number;
  author_name: string;
  category_id: number;
  author_image: string;
  is_active: boolean;
}

const Plog = ({ id, content, title, author_id, like_count, author_name, author_image }: PlogProps) => {
  return (
    <Box
      sx={{
        maxWidth: 800,
        margin: "20px auto",
        padding: 3,
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: 3,
        typography: "body1",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Box
          sx={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            overflow: "hidden",
            mr: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid #ddd",
          }}
        >
          <Image
            src={author_image || img.src} // use default image if author_image is missing
            alt="Author Profile"
            width={50}
            height={50}
            unoptimized
          />
        </Box>
        <Box>
          <Typography variant="subtitle1" fontWeight="bold" sx={{ color: "primary.main" }}>
            <Link href={`/profile/${author_id}`}>
              {author_name }
            </Link>
          </Typography>
        </Box>
      </Box>
      <Typography variant="h4" sx={{ mb: 2 }}>
        {title}
      </Typography>
      <ReadMore fullContent={content} />
      <Box>
        <LikeComment id={id} like_count={like_count} />
      </Box>
    </Box>
  );
};



export default Plog;
