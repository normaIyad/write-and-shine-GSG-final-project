"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Avatar,
  Paper,
  Divider,
  CircularProgress,
} from "@mui/material";
import Loader from "@/app/Components/Loader/Loader";
import { Iuser, Post, UserProfile } from "@/types/types";
import Plog from "@/app/Components/Plog/Plog";

interface IParams {
  id: string;
}

interface IProps {
  params: IParams;
}

const DynamicPage: React.FC<IProps> = ({ params }) => {
  const [data, setData] = useState<Iuser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  const fetchData = async () => {
    try {
      const [userResponse, profileResponse] = await Promise.all([
        fetch(`/api/user/${params.id}`),
        fetch(`/api/user/${params.id}/profile`),
      ]);

      const userData = await userResponse.json();
      const profileData = await profileResponse.json();

      if (userData && userData.length > 0) setData(userData[0]);
      if (profileData && profileData.length > 0) setProfile(profileData[0]);
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch(`/api/user/${params.id}/posts`);
      const postData = await response.json();

      if (postData && postData.posts) setPosts(postData.posts);
    } catch (error) {
      console.error("Error fetching user posts:", error);
    } finally {
      setLoadingPosts(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Loader />
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
              alt={data?.username}
              src={data?.image}
              sx={{ width: 120, height: 120, marginBottom: 2 }}
            />
            <Typography variant="h5" gutterBottom>
              {data?.username || "Unknown User"}
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              {data?.role || "Role Unavailable"}
            </Typography>
          </Box>

          <Divider sx={{ marginY: 2 }} />

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
              {profile?.biography || "Biography not provided."}
            </Typography>
          </Box>
        </Paper>
      </Grid>
      <Box sx={{ width: "3px", backgroundColor: "#1976d2", marginX: 2 }}></Box>
      <Grid item xs={18} md={8} lg={8.5}>
        <Box>
          <Box
            sx={{
              marginBottom: 4,
              padding: 2,
              backgroundColor: "#f5f5f5",
              borderRadius: 2,
            }}
          >
            <Typography variant="h5" fontWeight="bold" color="#1976d2">
              {data?.username?.trim()}’s Blogs
            </Typography>
          </Box>
          {loadingPosts ? (
            <CircularProgress />
          ) : posts.length === 0 ? (
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
                author_id={post.author_id}
                like_count={post.like_count}
                author_name={post.author_name || "Unknown"}
                category_id={post.category_id || 0}
                author_image={data?.image}
                is_active={post.is_active || true}
              />
            ))
          )}

        </Box>
      </Grid>

    </Grid>
  );
};

export default DynamicPage;
