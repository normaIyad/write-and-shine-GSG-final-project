"use client";
import React from "react";
import Textarea from "@mui/joy/Textarea";
import Box from "@mui/material/Box";
import Image from "next/image";

import img from "@/public/Account_user/account_circle.svg";

const CreateBlog = () => {
  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        margin: "20px auto",
        maxWidth: 800,
        borderRadius: 20,
        padding: "20px",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
        display: "flex",
        alignItems: "center",
        gap: "5px",
       
      }}
    >
      <Box
        sx={{
          width: 80,
          height: 40,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10,
        }}
      >
        <Image src={img.src} width={40} height={40} alt="Blog Post Example" />
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Textarea
          sx={{
            backgroundColor: "white",
            borderRadius: 30,
            padding: "10px",
            width: "100%",
            height: "40px", 
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
            transition: "box-shadow 0.3s ease-in-out",
            "&:hover": {
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            },
            "&:focus": {
              outline: "none",
              boxShadow: "0px 0px 10px rgba(0, 100, 255, 0.5)",
            },
          }}
          color="primary"
          minRows={2}
          size="lg"
          variant="outlined"
          placeholder="Write a blog post..."
        />
      </Box>
    </Box>
  );
};

export default CreateBlog;