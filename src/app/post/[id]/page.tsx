"use client"
import { useEffect, useState } from 'react';
import Image from 'next/image';
import avatarUser from '@/assets/userprf.png';
import { FaRegComments } from 'react-icons/fa6';
import Comments from '@/components/Comments';
import { useParams, useRouter } from 'next/navigation';
import { DashbaordHeader } from '@/components/DashboardHeader';
import { Profile } from '@/components/profile';
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

const PostDetail = () => {
  const router = useRouter();
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/posts/${id}`)
        .then((response) => response.json())
        .then((data) => setPost(data.post))
        .catch((error) => console.error('Error fetching post:', error));
    }
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <DashbaordHeader />
      <div className='flex flex-col md:flex-row gap-5 mx-24'>
        <Profile />
        <div className="mt-28 flex-1  w-[500px]">
          <div className='border border-gray-700 rounded-md p-5 mb-5 cursor-pointer'>
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
        </div>
        <div className="p-4 w-[500px]">
          <Comments postId={post.id} />
        </div>
      </div>
    </>
  );
};

export default PostDetail;
