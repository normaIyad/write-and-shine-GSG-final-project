import Plog from '@/app/Components/Plog/Plog';
import React from 'react';

interface IParams {
  id: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  user_id: number;
  category_id: number ; 
  like_count: number; 
  user_name: string;
  user_image: string ; 
  is_active: boolean;
}

async function fetchPost(id: string): Promise<Post | null> {
  try {
    const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
      method: 'GET',
      cache: 'no-store', // Ensures fresh data for each request
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch post: ${res.statusText}`);
    }

    const data = await res.json();
    return data.post;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

const Page = async ({ params }: { params: IParams }) => {
  const post = await fetchPost(params.id);

  if (!post) {
    return <div>Post not found</div>;
  }

  // Ensure like_count is available (set to 0 if undefined)
  const categoryId = post.user_id ?? 0; // Default to 0 if null
  return (
    <div>
      <Plog
        id={post.id}
        content={post.content}
        title={post.title}
        author_id={post.user_id}
        like_count={null}
        author_name={post.user_name}
        author_image={ post.user_image}
        category_id={categoryId}
        is_active={post.is_active}
      />
    </div>
  );
};

export default Page;
