'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function EditPostPage() {
  const { id } = useParams();
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/posts/${id}`);
        
       const data= res.data; 
        setFormData({
          title: data.post.title,
          content: data.post.content,
        });
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load post');
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);
console.log(formData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const res = await axios.patch(`/api/posts/${id}`, formData);
        Swal.fire({
            title: "Post Updated Successfully!",
            icon: "success",
            draggable: true,
        });
    

      if (res.status !== 200) {
        const data = await res.data;
        if (data.error && typeof data.error === 'object') {
          setErrors(data.error);
        }
        throw new Error('Failed to update post');
      }

      router.push('/');
    } catch (err) {
      setError('Failed to update post');
    }
  };

  const renderError = (field: string) => {
    return errors[field] ? (
      <div className="mt-1 text-sm text-red-600">
        {errors[field].map((error: string, index: number) => (
          <p key={index}>{error}</p>
        ))}
      </div>
    ) : null;
  };

  return (
    <div className="card bg-white p-6 shadow-md rounded-lg max-w-3xl mx-auto mt-10">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">Edit Post</h1>

      {error && <div className="mb-4 text-red-600">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring focus:ring-blue-300"
            />
            {renderError("title")}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Content</label>
            <input
              type="text"
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring focus:ring-blue-300"
            />
            {renderError("content")}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="mt-8 w-full sm:w-auto rounded-tl-3xl bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-700"
          >
            Edit Post
          </button>
        </div>
      </form>
    </div>
  );
}
