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
  const [loading, setLoading] = useState(true);

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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <div className='flex flex-col md:flex-row gap-5 mx-24'>
        <Profile />
        <div className="flex-1 w-[500px]">
          <div className='md:mt-24 overflow-auto h-[100vh]'>
            {loading ? (
              // Skeleton Loading
              <div className="flex flex-col gap-10">
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="border border-gray-800 rounded-md p-5 mb-5">
                    <div className="flex items-center gap-5 mb-5">
                      <div className="skeleton h-14 w-14 rounded-full"></div>
                      <div className="flex flex-col gap-2 w-full">
                        <div className="skeleton h-4 w-28"></div>
                        <div className="skeleton h-4 w-full"></div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="skeleton h-6 w-full"></div>
                      <div className="skeleton h-4 w-1/2"></div>
                    </div>
                    <div className="flex mt-5 gap-2">
                      <div className="skeleton h-10 w-32"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Post Content
              posts.map((post) => (
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
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
