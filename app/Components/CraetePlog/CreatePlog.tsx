"use client";
import React, { useState, useEffect } from "react";
import Textarea from "@mui/joy/Textarea";
import Box from "@mui/material/Box";
import Image from "next/image";
import Button from "@mui/material/Button";
import img from "@/public/Account_user/account_circle.svg";
import { InputLabel, MenuItem, Select, SelectChangeEvent, ThemeProvider, Typography } from "@mui/material";
import { Icatigory, Itags, Post } from "@/types/types";
import {
  position,
  theme,
  buttonsTheme,
  flex,
  flexColom,
  supmitButton,
  textaria,
  textFieldStyles,
  mainbox,
} from "./theme";
import CancelIcon from "@mui/icons-material/Cancel";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
const CreateBlog = ({ onPostAdded }: { onPostAdded: () => void}) => {
  const [isTyping, setIsTyping] = useState(false);
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<Itags[]>([]);
  const [catigory, setCat] = useState<Icatigory[]>([]);
  const [chosen_cat, setChosen_cat] = useState<Icatigory>();
  const [Chosen_tag, setChosen_tag] = useState(false);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [alerts, setAlert] = useState<{
    type: "success" | "info" | "warning" | "error";
    message: string;
  } | null>(null);

  const handleSubmit = () => {
    if (title.length < 5) {
      setAlert({ type: "warning", message: "Blog title should be at least 5 characters long!" });
      return;
    }
    if (text.length < 10) {
      setAlert({ type: "warning", message: "Blog content should be at least 10 characters long!" });
      return;
    }
    if (text.length === 0) {
      setAlert({ type: "error", message: "Please enter blog content!" });
      return;
    }
    if (selectedTags.length === 0) {
      setAlert({ type: "error", message: "Please select at least one blog category!" });
      return;
    }
    if (title.length === 0) {
      setAlert({ type: "error", message: "Blog title should not be empty!" });
      return;
    }

    const newPost: Post = {
      title: title,
      content: text,
      author_id: 1,
      category_id: chosen_cat?.id || 1, 
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      id: 0
    };
    addPost(newPost);
    setAlert({ type: "success", message: "Blog posted successfully!" });
    onPostAdded(); 
    setText("");
    setTitle("");
    setSelectedTags([]);
    setIsTyping(false);
  };

  const getCatigory = async () => {
    fetch("api/categories")
      .then((res) => res.json())
      .then((data) => setCat(data.data))
      .catch((error) => console.error("Error fetching data:", error));
  };
  const getTags = async () => {
    fetch("api/tags")
      .then((res) => res.json())
      .then((data) => setTags(data))
      .catch((error) => console.error("Error fetching data:", error));

  }

  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedCatId = parseInt(event.target.value, 10);
    if (isNaN(selectedCatId)) {
      console.error("Invalid category ID selected.");
      return;
    }
    const selectedCategory = catigory.find((cat) => cat.id === selectedCatId);
    setChosen_cat(selectedCategory || undefined); // Handle undefined case
  };

  useEffect(() => {
    getCatigory();
    getTags();
  }, []);
  const addPost = async (postdata: Post) => {
    const response = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: postdata.title,
        content: postdata.content,
        author_id: postdata.author_id,
        category_id: postdata.category_id,
        is_active: postdata.is_active,
        created_at: postdata.created_at,
        updated_at: postdata.updated_at,
        tags: selectedTags,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    console.log(response);
  };
  console.log(text);
  console.log(tags);
  const ChosenTag = (tag: Itags) => {
    setChosen_tag(!Chosen_tag);
    setSelectedTags((prevTags) =>
      prevTags.includes(tag.id)
        ? prevTags.filter((id) => id !== tag.id)
        : [...prevTags, tag.id]
    );
    console.log(tag);
  };
  return (
    <Box
      sx={{
        ...mainbox,
        boxShadow: isTyping
          ? "0px 6px 25px rgba(0, 100, 255, 0.3)"
          : "0px 4px 20px rgba(0, 0, 0, 0.2)",
        backgroundColor: isTyping ? "#f5faff" : "primary.main",
        zIndex: isTyping ? 10 : 1,
        ...(isTyping ? position : {}),
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
      <Box sx={flex}>
        <Box sx={{
          width: isTyping ? 1 : 80, height: 40,
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
        </Box>
        {isTyping && (
          <Button onClick={() => setIsTyping(false)}>
            <CancelIcon />
          </Button>
        )}
      </Box>

      <Box sx={{ flexGrow: 1, position: "relative", zIndex: 5 }}>
        {isTyping && (
          <Box>
            <TextField
              sx={textFieldStyles}
              fullWidth
              label="Enter your title..."
              id="fullWidth"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Box>
        )}
        <Textarea
          sx={{
            ...textaria,
            height: isTyping ? "200px" : "40px",
            boxShadow: isTyping
              ? "0px 4px 15px rgba(0, 100, 255, 0.4)"
              : "0px 2px 5px rgba(0, 0, 0, 0.1)",
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
        <Box sx={flexColom}>
          <Box sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={chosen_cat?.id?.toString() || ""}
              label="Category "
              onChange={handleChange}
              displayEmpty
            >
              <MenuItem value="" disabled>
                Select a category
              </MenuItem>
              {catigory.map((value) => (
                <MenuItem key={value.id} value={value.id}>
                  {value.name}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <ThemeProvider theme={theme}>
            <Typography>
              Help people find your blog easily by adding tags
            </Typography>
            <Box>
              <ThemeProvider theme={buttonsTheme}>
                {tags?.map((tag) => (
                  <Button
                    key={tag.id}
                    onClick={() => ChosenTag(tag)}
                    variant={
                      selectedTags.includes(tag.id) ? "contained" : "outlined"
                    }
                    size="small"
                  >
                    {tag.name}
                  </Button>
                ))}
                <Button variant="outlined" size="small">
                  +
                </Button>
              </ThemeProvider>
            </Box>
            <Typography variant="subtitle1">
              You can add up to 5 tags.
            </Typography>
          </ThemeProvider>
          <Button
            variant="contained"
            color="primary"
            sx={supmitButton}
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
