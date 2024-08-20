"use client";
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import avatarUser from '@/assets/userprf.png';
import { FaRegComments } from 'react-icons/fa6';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { IoMdArrowRoundBack } from "react-icons/io";

interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  comments: {
    id: string;
    content: string;
    user: {
      name: string;
    };
  }[];
}

const Page = () => {
  const { data: session } = useSession();
  const [data, setData] = useState({ title: '', content: '' });
  const [posts, setPosts] = useState<Post[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    if (session?.user.id !== undefined) {
      getContentByUser(session?.user.id);
    }
  }, [trigger, session?.user.id]);

  const getContentByUser = async (userId: string) => {
    try {
      const res = await fetch(`/api/posts?userId=${session?.user.id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) throw new Error('Failed to fetch posts');
      const result = await res.json();
      setPosts(result.posts.filter((post: any) => post.authorId === userId));
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const uploadContent = async (data: { title: string; content: string }) => {
    try {
      const res = await fetch(`/api/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to submit the form');
      const result = await res.json();
      setPosts((prevPosts) => [...prevPosts, result.post]);
      setData({ title: '', content: '' });
      setToastMessage('Content submitted successfully!');
      setTimeout(() => setToastMessage(null), 3000);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setTrigger(!trigger);
    }
  };

  const deleteContent = async (id: string) => {
    try {
      await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setTrigger(!trigger);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteContent(id);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await uploadContent(data);
  };

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <section className='flex flex-col md:flex-row gap-5 p-5 md:p-10'>
      {toastMessage && (
        <div className="toast toast-top toast-center fixed z-50 top-0">
          <div className="alert alert-success">
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
      <div className="flex-1 w-full md:w-2/3">
        <div className='flex flex-col gap-5'>
          <Link href="/dashboard" className="btn btn-outline rounded-full btn-secondary">
            <IoMdArrowRoundBack />
          </Link>
          <h1 className='text-2xl md:text-3xl font-bold mb-5'>Your Posts</h1>
        </div>
        <div className='overflow-auto w-full h-[50vh] md:h-[70vh]'>
          {posts.map((post) => (
            <div key={post.id} className='border border-gray-800 rounded-md p-5 mb-5'>
              <div className="flex items-center gap-5 mb-5">
                <Image
                  className='rounded-full'
                  alt="User Avatar"
                  src={avatarUser}
                  width={56}
                  height={56}
                />
                <p className='text-lg font-semibold'>{post.author.name}</p>
                <p className='text-[10px] font-semibold'>{new Date(post.createdAt).toLocaleString()}</p>
              </div>
              <div className='w-auto'>
                <h1 className='text-xl md:text-2xl font-bold mb-5'>{post.title}</h1>
                <MarkdownRenderer content={post.content} className='overflow-y-scroll prose prose-invert' />
              </div>
              <div className='flex justify-between mt-5'>
                <button className='btn flex items-center gap-2'>
                  <FaRegComments className='text-xl md:text-2xl' />
                  <span>{post.comments.length} Comments</span>
                </button>
                <button onClick={() => handleDelete(post.id)} className='btn btn-error btn-outline rounded-full'>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <form className='flex flex-col gap-5 w-full md:w-1/3 mt-10 md:mt-0' onSubmit={handleSubmit}>
        <h1 className='text-xl md:text-2xl font-bold'>Post Your Content</h1>
        <p>You can write your content here! with your markdown setup.</p>
        <input
          type="text"
          placeholder="Your title"
          className="input input-bordered w-full"
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
        />
        <textarea
          onChange={(e) => setData({ ...data, content: e.target.value })}
          value={data.content}
          className="textarea textarea-secondary w-full h-40 md:h-60"
          placeholder="Your content"
        />
        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </section>
  );
};

export default Page;
