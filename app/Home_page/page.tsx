"use client";
import React, { useState, useEffect } from 'react';
import Plog from '@/app/Components/Plog/Plog';
import { Post } from "@/types/types";
import CreateBlog from '@/app/Components/CraetePlog/CreatePlog';
import Loader from "@/app/Components/Loader/Loader"

const HomePage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newpost, setNewpost] = useState<boolean>(false);
 const [loading, setLoading] = useState<boolean>(true); // Loading state
  useEffect(() => {
    setLoading(false); // Set loading to true before fetching
    fetch('/api/posts')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.data);
        setNewpost(false); 
        setLoading(true); // Set loading to false after fetching
        
      })
      .catch((err) => console.error("Error fetching posts:", err));
  }, [newpost]); 

  const handleNewPost = () => {
    setNewpost(true); 
  };

  return (
    <div>
<<<<<<< HEAD
<<<<<<< HEAD
     {posts.length > 0 ? (
      <>
      <CreateBlog onPostAdded={handleNewPost} />
      {  posts.map((plog: Post) => (
          <Plog key={plog.id} {...plog} />
        )) }
      </>
=======
=======
>>>>>>> origin/Norma-Homepage
      {posts.length > 0 ? (
        <>
          <CreateBlog onPostAdded={handleNewPost} />
          {posts.map((plog: Post) => (
            <Plog key={plog.id} {...plog} />
          ))}
        </>
<<<<<<< HEAD
>>>>>>> origin/Norma-Homepage
=======
>>>>>>> origin/Norma-Homepage
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default HomePage;
