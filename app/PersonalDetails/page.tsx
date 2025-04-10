"use client";
import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Avatar, Paper, Divider, Button } from "@mui/material";
import EditProfileForm from "../Components/EditProfileForm/EditProfileForm";
import { useUserStore } from "../store/useUserStore";
import { Iuser, Post, UserProfile } from "@/types/types";
import Plog from "../Components/Plog/Plog";

const UserProfilePage = () => {
  const { userData } = useUserStore(); // Assuming userData is available from a store
  const [showEditForm, setShowEditForm] = useState(false);
  const [userDetails, setUserDetails] = useState<Iuser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`/api/user/${userData?.userId}`);
      const data = await response.json();
      if (data && data.length > 0) {
        setUserDetails(data[0]);
      } else {
        console.error("User data not found in response");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(`/api/user/${userData?.userId}/profile`);
      const data = await response.json();
      if (data && data.length > 0) {
        setProfile(data[0]);
      } else {
        console.error("User profile not found in response");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserPosts = async () => {
    try {
      const response = await fetch(`/api/user/${userData?.userId}/posts`);
      const data = await response.json();
      if (data && data.posts) {
        setPosts(data.posts);
      } else {
        console.error("No posts found in response");
      }
    } catch (error) {
      console.error("Error fetching user posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userData?.userId) {
      fetchUserData();
      fetchUserProfile();
      fetchUserPosts();
    }
  }, [userData]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6">Loading your profile...</Typography>
      </Box>
    );
  }

  return (
    <Grid container sx={{ height: "100vh", padding: 2 }}>
      {/* User Info Section */}
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
              alt={userDetails?.username || "Unknown User"}
              src={userDetails?.image || "/default-avatar.png"}
              sx={{ width: 120, height: 120, marginBottom: 2 }}
            />
            <Typography variant="h5" gutterBottom>
              {userDetails?.username || "Unknown User"}
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              {userDetails?.role || "Role Unavailable"}
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

          {/* User Profile Details */}
          <Box>
            <Typography variant="subtitle1" color="primary">
              Education
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {profile?.education || "Not provided"}
            </Typography>
          </Box>

          <Divider sx={{ marginY: 2 }} />

          <Box>
            <Typography variant="subtitle1" color="primary">
              Biography
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 1 }}>
              {profile?.biography || "Biography not provided"}
            </Typography>
          </Box>
        </Paper>
      </Grid>

      {/* Divider */}
      <Box sx={{ width: "3px", backgroundColor: "#1976d2", marginX: 2 }}></Box>

      {/* Blog Posts Section */}
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
                {userDetails?.username?.trim()}'s Blogs
              </Typography>
            </Box>

            {posts.length === 0 ? (
              <Typography variant="body1" color="textSecondary">
                No posts available.
              </Typography>
            ) : (
              posts.map((post) => (
                <Plog
                  key={post.id}
                  id={post.id}
                  content={post.content}
                  title={post.title}
                  like_count={post.like_count}
                  author_name={userDetails?.username}
                  author_id={post.author_id}
                  author_image={userDetails?.image}
                  is_active={post.is_active || true}
                />
              ))
            )}
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

export default UserProfilePage;
