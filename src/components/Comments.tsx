import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import avatarUser from '@/assets/userprf.png';

interface Comment {
  id: string;
  content: string;
  author: {
    name: string;
  };
}

interface CommentsProps {
  postId: string;
}

const Comments: React.FC<CommentsProps> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/comments?postId=${postId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }
      const data = await response.json();
      setComments(data.comments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleCommentSubmit = async () => {
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId, content: newComment }),
      });
      if (!response.ok) {
        throw new Error('Failed to post comment');
      }
      const data = await response.json();
      setComments((prevComments) => [...prevComments, data.comment]);
      setNewComment('');
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  useEffect(() => {
    if (postId) {
      fetchComments();
    }
  }, [postId]);

  return (
    <div className='mt-24'>
      <div className='flex flex-col p-5 gap-4 w-[500px]  h-[80vh] border-2 rounded-lg border-gray-600'>
        <div className='flex flex-col'>
          {comments.map((comment) => (
            <div key={comment.id} className="comment">
              <div className='flex gap-5 items-center'>
                <Image
                  className='rounded-full'
                  alt="User Avatar"
                  src={avatarUser}
                  width={56}
                  height={56}
                />
                <div className='flex chat w-full chat-start'>
                 
                  <div className="chat chat-start chat-bubble text-lg">
                  <p className='text-sm font-semibold'>{comment.author.name}</p>
                    <p>{comment.content}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          onClick={handleCommentSubmit}
          className='btn btn-outline btn-primary'
        >
          Send
        </button>
      </div>

    </div>
  );
};

export default Comments;
