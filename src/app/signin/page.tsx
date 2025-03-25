import { signIn, providerMap, signOut } from 'auth';

import { BsGoogle } from 'react-icons/bs';

const icons = [{ name: 'Google', icon: <BsGoogle /> }];

const SignInpage = async () => {
  const findIcon = (name: string) => {
    const icon = icons.find((item) => item.name === name);
    return icon?.icon ?? "";
  }
  return (
    <div className='w-1/2 mx-auto my-10 px-4 flex flex-col gap-2'>
      <h2 className='text-[2rem] leading-10 font-semibold text-center'>Acesse ou crie sua conta com uma das opões disponíveis</h2>
      {Object.values(providerMap).map((provider) => (
        <form
          key={provider.id}
          action={async () => {
            'use server';
            await signOut({ redirect: false })
            await signIn(provider.id, {
              redirectTo: '/',
              prompt: 'select_account',
            });
          }}
          className='mt-10 flex justify-center'
        >
          <button className="cursor-pointer h-10 md:px-6 px-4 md:font-medium border border-zinc-600 flex items-center gap-2 rounded hover:bg-slate-100">
            {findIcon(provider.name)}
            <span>
              Entrar com o <strong>{provider.name}</strong>
            </span>
          </button>
        </form>
      ))}
    </div>
  );
};

export default SignInpage;
