"use client";
import { Profile } from '@/components/profile';
import React, { useEffect, useState } from 'react';
import avatarUser from '@/assets/userprf.png';
import Image from 'next/image';
import { FaRegComments } from "react-icons/fa6";
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import Skeleton from '@/components/Skeleton';

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
    <div className='flex flex-col md:flex-row md:gap-10 p-5 md:px-24'>
      <Profile />
      <div className="flex-1 w-full md:w-[500px]">
        <div className='md:mt-20 overflow-auto h-[100vh]'>
          {loading ? (
            // Skeleton Loading
            <Skeleton />
          ) : (
            // Post Content
            posts.map((post) => (
              <Link key={post.id} href={`/post/${post.id}`}>
                <div className='border border-gray-800 rounded-md p-5 mb-5 cursor-pointer hover:bg-gray-900 transition-colors'>
                  <div className="flex items-center gap-5 mb-5">
                    <Image
                      className='rounded-full'
                      alt="User Avatar"
                      src={post.author.avatar || avatarUser}
                      width={56}
                      height={56}
                    />
                    <div className='flex-1'>
                      <p className='text-lg font-semibold'>{post.author.name}</p>
                      <p className='text-sm text-gray-500'>{new Date(post.createdAt).toLocaleString()}</p>
                    </div>
                  </div>
                  <div>
                    <h1 className='text-2xl font-bold mb-3'>{post.title}</h1>
                    <MarkdownRenderer content={post.content} className='text-sm prose prose-invert' />
                  </div>
                  <div className='flex mt-5'>
                    <Link href={`/post/${post.id}`}>
                      <button className='btn btn-secondary flex items-center gap-2 text-sm'>
                        <FaRegComments className='text-xl' />
                        <span>{post.comments?.length} Comments</span>
                      </button>
                    </Link>

                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
