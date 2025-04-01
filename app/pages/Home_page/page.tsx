"use client";
import React, { useState, useEffect } from 'react';
import Plog from '@/app/Components/Plog/Plog';
import { Post } from "@/types/types";
import CreateBlog from '@/app/Components/CraetePlog/CreatePlog';

const HomePage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    fetch('/api/posts')
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, []); 

  return (
    <div>
      <CreateBlog/>
      {posts.length > 0 ? (
        posts.map((plog: Post) => (
          <Plog key={plog.id} {...plog}  />
        ))
      ) : (
        <p>Loading posts...</p>
      )}
    </div>
  );
};

export default HomePage;
