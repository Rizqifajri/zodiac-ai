"use client";
import { DashbaordHeader } from '@/components/DashboardHeader';
import Profile from '@/components/profile';
import React, { useEffect, useState } from 'react';
import avatarUser from '@/assets/userprf.png';
import Image from 'next/image';
import { FaRegComments } from "react-icons/fa6";
import Comments from '@/components/Comments';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import MarkdownRenderer from '@/components/MarkdownRenderer';

// Define the type for the post object
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
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts');
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      setPosts(data.posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <div className='flex flex-col md:flex-row gap-5 mx-24'>
        <Profile />
        <div className="flex-1">
          <div className='md:mt-24 overflow-auto h-[100vh]'>
            {posts.map((post) => (
              <Link key={post.id} href={`/post/${post.id}`}>
                <div className='border border-gray-800 rounded-md p-5 mb-5 cursor-pointer'>
                  <div className="flex items-center gap-5 mb-5">
                    <Image
                      className='rounded-full'
                      alt="User Avatar"
                      src={post.author.avatar || avatarUser}
                      width={56}
                      height={56}
                    />
                    <p className='text-lg font-semibold'>{post.author.name}</p>
                    <p className='text-[10px] font-semibold'>{new Date(post.createdAt).toLocaleString()}</p>
                  </div>
                  <div className='w-auto'>
                    <h1 className='text-3xl font-bold mb-5'>{post.title}</h1>
                    <MarkdownRenderer content={post.content} className='overflow-y-scroll text-wrap prose prose-invert' />
                  </div>
                  <div className='flex mt-5'>
                    <button className='btn flex items-center gap-2'>
                      <FaRegComments className='text-3xl' />
                      <span>{post.comments?.length} Comments</span>
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        {/* <div className="w-[500px]">
          {posts[0] && <Comments postId={posts[0].id} />}
        </div> */}
      </div>
    </>
  );
};

export default Page;
