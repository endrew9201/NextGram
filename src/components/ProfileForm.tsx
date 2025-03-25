'use client';
import { updateUserProfile } from '@/actions';
import { User } from 'types/User';
import { useActionState, useEffect } from 'react';
import Label from './Label';
import Button from './Button';
import ImagePreview from './ImagePreview';
import FlashMessages from './FlashMessages';

type ProfileFormProps = {
  user: User;
};

const ProfileForm: React.FC<ProfileFormProps> = ({ user }) => {
  const [formState, formAction] = useActionState(updateUserProfile, {
    message: '',
    type: 'sucess',
  });
  useEffect(() => {
    if (formState.message) {
      const timer = setTimeout(() => {
        window.location.reload();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [formState.message]);

  return (
    <div className="">
      {formState.message && <FlashMessages message={formState.message} type={formState.type}/>}

      <form className="flex flex-col gap-4" action={formAction}>
        <input type="hidden" name="id" value={user.id} className="" />
        <div>
          <Label htmlFor="name" text="nome" />
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Digite o seu nome"
            defaultValue={user.name || ''}
            className="p-2 border border-zinc-300 w-full text-sm placeholder:text-zinc-500 focus:ring-0 focus:outline-none"
          />
        </div>
        <ImagePreview />
        <div className="flex justify-end">
          <Button
            type="submit"
            text="Salvar"
            disabled={formState.type === 'loading'}
          />
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
