'use client';

import { useState } from 'react';

import Modal from 'react-modal';

import { Post as PostType } from 'types/Post';

import Button from '../Button';

import FlashMessages from '../FlashMessages';
import { addComment } from '@/actions';
import { GrClose } from 'react-icons/gr';
import Image from 'next/image';

interface CommentModalProps {
  post: PostType;
  currentUserId?: string;
  isOpen: boolean;
  onRequestClose: () => void;
}

const CommentModal: React.FC<CommentModalProps> = ({
  post,
  currentUserId,
  isOpen,
  onRequestClose,
}) => {
  const [content, setContent] = useState('');
  const [flashMessage, setFLashMessage] = useState<{
    message: string;
    type: 'error' | 'sucess';
  } | null>(null);

  const handleAddComment = async () => {
    if (!currentUserId) {
      window.location.href = '/';
      return;
    }

    if (!content.trim()) {
      setFLashMessage({
        message: 'O comentario não pode estar vazio.',
        type: 'error',
      });
      return;
    }

    await addComment(post.id, currentUserId, content);
    setFLashMessage({
      message: 'Comentário adicionado com sucesso.',
      type: 'sucess',
    });

    setContent('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Comentários"
      ariaHideApp={false}
      className="w-[704px] mt-28 mx-auto bg-white rounded border border-zinc-300"
    >
      <div className="p-4">
        <div className="flex justify-between itemns-center">
          <h2 className="text-xl font-bold mb-4">Comentários</h2>
          <button
            onClick={onRequestClose}
            className="bg-red-600 hover:bg-red-400 text-white p-2 rounded-full cursor-pointer"
          >
            <GrClose />
          </button>
        </div>
        {flashMessage && (
          <FlashMessages
            message={flashMessage.message}
            type={flashMessage.type}
          />
        )}
        <div className="flex mb-4 flex-col">
          {post.comments && post.comments.length > 0 ? (
            post.comments.map((comment) => (
              <div
                key={comment.id}
                className="flex items-center mb-4 border border-zinc-300 p-4"
              >
                {post.user.image && (
                  <Image 
                  src={post.user.image}
                  alt={`Imagem do usuário ${post.user.name}`}
                  width={40}
                  height={40}
                  className='w-10 h-10 object-cover rounded-full mr-3'
                  />
                  )}
                  <p className='text-sm'>
                    <strong>{comment.user.name}: {comment.content}</strong>
                  </p>
              </div>
            ))
          ) : (
            <p className="text-sm">Nenhum comentário ainda</p>
          )}
        </div>
        {currentUserId && (
          <div className="mb-4 flex flex-col gap-6">
            <textarea
              className="w-full h-32 p-2 border border-zinc-300 rounded text-sm font-medium"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Acitione um comentário"
            ></textarea>
            <div className="flex justify-end">
              <Button
                type="submit"
                text="Comentar"
                onClick={handleAddComment}
              />
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default CommentModal;
