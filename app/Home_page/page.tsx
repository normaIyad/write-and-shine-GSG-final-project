"use client";
import React, { useState, useEffect, useContext } from "react";
import Plog from "@/app/Components/Plog/Plog";
import { CustomPayload, Post } from "@/types/types";
import CreateBlog from "@/app/Components/CraetePlog/CreatePlog";
import Loader from "@/app/Components/Loader/Loader";
import { jwtDecode } from "jwt-decode";
import { UserContext } from "../Context/context";
import { useUserStore } from "../store/useUserStore";

const HomePage = () => {
  const { setUserData } = useContext(UserContext);
  const [posts, setPosts] = useState<Post[]>([]);
  const [newpost, setNewpost] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const { isLogin } = useUserStore();
  useEffect(() => {
    setLoading(true);
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.data);
        setNewpost(false);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching posts:", err));
    console.log(isLogin, "home page");
  }, [newpost]);

  const handleNewPost = () => {
    setNewpost(true);
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("userToken");
      if (token) {
        const user = jwtDecode<CustomPayload>(token);
        setUserData(user);
      }
    }
  }, []);

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
