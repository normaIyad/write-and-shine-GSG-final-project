import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import ReadMore from "./ReadMore"; 
import img from "@/public/Account_user/account_circle.svg";
import IPlog from "@/types/types";

const Plog = ({ id, content, createdAt, name, image }: IPlog) => {
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
          <Image src={image && image.trim() !== "" ? image : img} alt="Author Profile" width={50} height={50} unoptimized />
        </Box>
        <Box>
          <Typography variant="subtitle1" fontWeight="bold" sx={{ color: "primary.main" }}>
            Author: {name} {id}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Date: {createdAt}
          </Typography>
        </Box>
      </Box>
    <ReadMore fullContent={content} />
    </Box>
  );
};

export default Plog;
