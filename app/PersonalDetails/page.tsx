"use client";
import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Avatar,
  Paper,
  Divider,
  Button,
} from "@mui/material";
import BlogCard from "../Components/BlogCard/BlogCard";
import EditProfileForm from "../Components/EditProfileForm/EditProfileForm";
const blogs = [
  {
    id: 1,
    title: "The Journey of a Frontend Developer",
    content:
      "Frontend development is an exciting field that evolves constantly...",
    likes: 120,
    comments: [
      { id: 1, user: "John Doe", text: "Great blog post! I learned a lot." },
      { id: 2, user: "Alice Smith", text: "Looking forward to more articles!" },
    ],
  },
  {
    id: 2,
    title: "Why React is Amazing",
    content:
      "React has taken the frontend world by storm with its component-based architecture...",
    likes: 90,
    comments: [
      { id: 1, user: "Jane Doe", text: "I totally agree, React is fantastic!" },
    ],
  },
  {
    id: 3,
    title: "Tips for Mastering JavaScript",
    content:
      "Mastering JavaScript involves understanding its core concepts deeply...",
    likes: 80,
    comments: [],
  },
];

const PersonalDetailsPage = () => {
  const [showEditForm, setShowEditForm] = useState(false);
  return (
    <Grid container sx={{ height: "100vh", padding: 2 }}>
      <Grid item xs={12} md={4} lg={3} sx={{ backgroundColor: "#e3f2fd" }}>
        <Paper
          elevation={3}
          sx={{
            padding: 3,
            borderRadius: 2,
            height: "100%",
            backgroundColor: "#f5f5f5",
          }}
        >
          <Box display="flex" flexDirection="column" alignItems="center">
            <Avatar
              alt="Husni Ishtayeh"
              src="/static/images/avatar.png"
              sx={{ width: 120, height: 120, marginBottom: 2 }}
            />
            <Typography variant="h5" gutterBottom>
              Husni Ishtayeh
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              Software Engineer
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: 2 }}
              onClick={() => setShowEditForm(!showEditForm)}
            >
              {showEditForm ? "View Blogs" : "Edit Profile"}
            </Button>
          </Box>

          <Divider sx={{ marginY: 2 }} />

          <Box>
            <Typography variant="subtitle1" color="primary">
              Education
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Bachelor of Computer Engineering, An-Najah National University
            </Typography>
          </Box>

          <Divider sx={{ marginY: 2 }} />

          <Box>
            <Typography variant="subtitle1" color="primary">
              Followers & Likes
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Followers: 1,000
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Likes: 5,000
            </Typography>
          </Box>

          <Divider sx={{ marginY: 2 }} />

          <Box>
            <Typography variant="subtitle1" color="primary">
              Biography
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 1 }}>
              Passionate about creating user-friendly and visually appealing web
              interfaces with modern technologies.
            </Typography>
          </Box>
        </Paper>
      </Grid>
      <Box sx={{ width: "3px", backgroundColor: "#1976d2", marginX: 2 }}></Box>
      <Grid item xs={12} md={8} lg={8.5}>
        {showEditForm ? (
          <EditProfileForm />
        ) : (
          <Box>
            <Box
              sx={{
                marginBottom: 4,
                padding: 2,
                backgroundColor: "#f5f5f5",
                borderRadius: 2,
                textAlign: "left",
              }}
            >
              <Typography variant="h5" fontWeight="bold" color="#1976d2">
                {" "}
                Husni Ishtayeh Blogs{" "}
              </Typography>
            </Box>
            {blogs.map((blog) => (
              <BlogCard
                key={blog.id}
                title={blog.title}
                content={blog.content}
                likes={blog.likes}
                comments={blog.comments}
                onDelete={() => {
                  console.log("Delete blog with ID:", blog.id);}}
              />
            ))}
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

export default PersonalDetailsPage;
