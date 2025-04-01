"use client";
import React, { useState } from "react";
import Textarea from "@mui/joy/Textarea";
import Box from "@mui/material/Box";
import Image from "next/image";
import Button from "@mui/material/Button";
import img from "@/public/Account_user/account_circle.svg";
import {  ThemeProvider, Typography } from "@mui/material";
import IPlog from "@/types/types"
import { position , theme , buttonsTheme} from "./theme";
interface CreatePlogProps {
  AddPost: (newPost: IPlog) => void;
}
const CreateBlog = ({ AddPost }: CreatePlogProps) => {
  const [isTyping, setIsTyping] = useState(false);
  const [text, setText] = useState("");
  // const [data , setData] = useState({})
  const [error, setError] = useState<string[]>([]);
  const handleSubmit = () => {
    if (text.length < 10) {
      setError((prevErrors) => [...prevErrors, "Blog content should be at least 10 characters long!"]);
      console.log(error.join("\n")); // Join errors into a string for display
      alert("Blog content should be at least 10 characters long!");
      return;
    }
    if (text.length === 0) {
      setError((prevErrors) => [...prevErrors, "Please enter blog content"]);
      console.log(error.join("\n"));
      alert("Please enter blog content!");
      return;
    }
    if (error.length === 0) {
      const newPost: IPlog = {
        id: 5,
        title: "Sample Title",
        content: text,
        createdAt: new Date().toISOString(),
        name: "John Doe",
        image: "https://via.placeholder.com/150",
      };
      console.log(newPost);
      AddPost(newPost);
      alert("Blog posted!");
      setText("");
      setIsTyping(false)
      setError([]);
    } else {
      alert(error.join("\n")); 
      setError([]); 
    }
  };

  console.log(text);

  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        margin: "20px auto",
        maxWidth: 800,
        borderRadius: 20,
        padding: "20px",
        boxShadow: isTyping
          ? "0px 6px 25px rgba(0, 100, 255, 0.3)"
          : "0px 4px 20px rgba(0, 0, 0, 0.2)",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        transition: "box-shadow 0.3s ease-in-out, background-color 0.3s",
        backgroundColor: isTyping ? "#f5faff" : "primary.main",
        position: "relative",
        zIndex: isTyping ? 10 : 1, // Higher z-index when typing
        ...(isTyping ? position : {}),
      }}
    >
      <Box
        sx={{
          width: isTyping ? 1 : 80,
          height: 40,
          display: "flex",
          padding: isTyping ? "10px" : "",
          margin: isTyping ? "10px" : "",
          justifyContent: isTyping ? "flex-start" : "center",
          alignItems: "center",
          borderRadius: 10,
        }}
      >
        <Image src={img.src} width={40} height={40} alt="User Avatar" />
        {isTyping ? <Box>User name </Box> : null}
        {/* you can make it from local storeg  */}
      </Box>
      <Box sx={{ flexGrow: 1, position: "relative", zIndex: 5 }}>
        <Textarea
          sx={{
            backgroundColor: "white",
            borderRadius: 30,
            padding: "10px",
            width: "100%",
            height: isTyping ? "200px" : "40px",
            boxShadow: isTyping
              ? "0px 4px 15px rgba(0, 100, 255, 0.4)"
              : "0px 2px 5px rgba(0, 0, 0, 0.1)",
            transition: "height 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
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
          value={text}
          onChange={(e) => setText(e.target.value)}
          onFocus={() => setIsTyping(true)}
        />
      </Box>
      {isTyping ? (
        <Box sx={{
          margin: "10px",
          display: "flex",
          gap : "2px",
          flexDirection: "column",
        }}>
          <ThemeProvider theme={theme}>
            <Typography>Help people find your blog easily by adding tags</Typography>
            <Box>
              <ThemeProvider theme={buttonsTheme}>
                <Button variant="outlined" size="small">Tag 1</Button>
                <Button variant="outlined" size="small">Tag 2</Button>
                <Button variant="outlined" size="small">Tag 3</Button>
                <Button variant="outlined" size="small">+</Button>
              </ThemeProvider>
            </Box>
            <Typography variant="subtitle1">You can add up to 5 tags.</Typography>
          </ThemeProvider>
          <Button
            variant="contained"
            color="primary"
            sx={{
              position: "absolute",  // Position the button absolutely within its container
              bottom: "20px",        // Add space from the bottom of the container
              right: "20px",  
              margin: "10px",
              marginRight: "auto",
              borderRadius: "20px",
              height: "40px",
              fontWeight: "bold",
              padding: "10px 20px",
              zIndex: 15, // Ensures the button stays above other elements
              transition: "opacity 0.3s ease-in-out",
            }}
            onClick={handleSubmit}
          >
            Post
          </Button>
        </Box>
      ) : null}
    </Box>
  );
};

export default CreateBlog;
