"use client";
import React, { useState, useEffect } from "react";
import Plog from "@/app/Components/Plog/Plog";
import { Post } from "@/types/types";
import CreateBlog from "@/app/Components/CraetePlog/CreatePlog";
import Loader from "@/app/Components/Loader/Loader";


const HomePage = () => {
  const [posts, setPosts] = useState<Post[]>([]); 
  const [newPost, setNewPost] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true); 
  useEffect(() => {
    setLoading(true);
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.data || []); 
        setNewPost(false);
      })
      .catch((err) => console.error("Error fetching posts:", err))
      .finally(() => setLoading(false)); 
  }, [newPost]);

  const handleNewPost = () => {
    setNewPost(true);
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : posts.length > 0 ? ( 
        <>
          <CreateBlog onPostAdded={handleNewPost} />
          {posts.map((plog: Post) => (
            <Plog key={plog.id} {...plog} />
          ))}
        </>
      ) : (
        <p>No posts available. Add a new one!</p>
      )}
    </div>
  );
};

export default HomePage;
