import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import ReadMore from "./ReadMore";
import img from "@/public/Account_user/account_circle.svg";
import { Post } from "@/types/types";
const Plog = ({  content,title , author_id , created_at }: Post) => {
  const [username , setUsername] = useState();
  useEffect(() => {
    if (author_id) {
      fetch(`api/user/${author_id}`)
        .then((res) => res.json())
        .then((data) => {
           setUsername(data[0]?.username); // Access the first item's username
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [author_id]);
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
        <Image src={img.src} alt="Author Profile" width={50} height={50} unoptimized />
      </Box>
      <Box>
        <Typography variant="subtitle1" fontWeight="bold" sx={{ color: "primary.main" }}>
            <Link href={`/user/${author_id}`}>
              {username || "Loading..."}
            </Link>
          
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Date: {created_at}
        </Typography>
      </Box>
    </Box>
    <Typography variant="h4" sx={{ mb: 2 }}>
      {title}
    </Typography>
    <ReadMore fullContent={content} />
  </Box>
  );
};

export default Plog;
