import { getUserPosts } from '@/actions';
import Button from '@/components/Button';
import ButtonLink from '@/components/ButtonLink';
import { auth } from 'auth';
import Image from 'next/image';
import { redirect } from 'next/navigation';

const MyPostspage: React.FC = async () => {
  const session = await auth();

  let userId = null;

  if (session) {
    userId = session.user.userId;
  } else {
    return redirect('/');
  }

  const posts = await getUserPosts(userId);

  return (
    <div className="mx-auto my-10 p-4">
      <h1 className="text-[2rem] leading-10 font-semibold text-center mb-8">
        Minhas postagens
      </h1>
      {posts.length === 0 ? (
        <div className="text-center">
          <p className="mb-4 font-medium">
            Voce ainda nao criou nenhuma postagem
          </p>
          <div className="flex justify-center">
            <ButtonLink text="Criar nova postagem" url="/post/new" />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post.id} className="border rounded p-4 shadow-sm">
              <Image
                src={post.imageUrl}
                alt={post.caption || 'imagem do post'}
                className="w-[366px] h-[218px] mb-4"
                width={366}
                height={218}
              />
              {post.caption && (
                <p className='mb-2 text-sm font-medium'>{post.caption}</p>
              )}
              <form>
                <input type="hidden" name='useId' value={post.id}/>
                <input type="hidden" name="postId" value={post.id}/>
                <div className='flex justify-end'>
                  <Button text='Excluir' type='submit' danger={true}/>
                </div>
              </form>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPostspage;
