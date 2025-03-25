'use client';

import { useActionState } from 'react';
import FlashMessages from './FlashMessages';
import { createPost } from '@/actions';
import Button from './Button';
import ImagePreview from './ImagePreview';
import Label from './Label';

const CreateFormPost: React.FC = () => {
  const [formState, formAction] = useActionState(createPost, {
    message: '',
    type: 'sucess',
  });
  

  return (
    <div className="">
      {formState.message && (
        <FlashMessages message={formState.message} type={formState.type} />
      )}

      <form className="flex flex-col gap-4" action={formAction}>
        <ImagePreview />
        <div>
          <Label htmlFor="caption" text="Conteúdo do post" />
          <textarea
            id="caption"
            name="caption"
            placeholder="Digite algo..."
            className="p-2 h-32 border border-zinc-300 w-full text-sm placeholder:text-zinc-500 focus:ring-0 focus:outline-none"
          >

            </textarea>
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
            text="Criar post"
            disabled={formState.type === 'loading'}
          />
        </div>
      </form>
    </div>
  );
};

export default CreateFormPost;
