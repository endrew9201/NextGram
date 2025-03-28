'use client';
import { likePost } from '@/actions';
import { useState } from 'react';
import { BsFillHeartFill, BsHeart } from 'react-icons/bs';

interface LikeButtonProps {
  postId: string;
  initialLikeCount: number;
  isLiked: boolean;
  currentUserId?: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({
  postId,
  initialLikeCount,
  isLiked,
  currentUserId,
}) => {
  const [likesCount, setLikesCount] = useState(initialLikeCount);
  const [liked, setLiked] = useState(isLiked);

  const handleLike = async () => {
    if (!currentUserId) {
      window.location.href = '/signin';
      return;
    }
    await likePost(postId, currentUserId);

    setLiked(!liked);
    setLikesCount(liked ? likesCount - 1 : likesCount + 1);
  };

  return (
    <div className="flex itemns-center">
      <button onClick={handleLike} className="mr-2 cursor-pointer">
        {liked ? (
          <BsFillHeartFill className="w-6 h-6 text-red-500" />
        ) : (
          <BsHeart className="w-6 h-6 text-gray-500" />
        )}
      </button>
      <span>{likesCount}</span>
    </div>
  );
};

export default LikeButton;
