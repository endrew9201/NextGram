import { auth, signIn, signOut } from "auth";
import Link from "next/link";
const Navbar = async () => {

    const session = await auth();

  return (
    <div className="bg-gray-700 text-white p-4 flex justify-between items-center">
        <Link href="/">HOME</Link>
        <div>
            {session && session.user ? (
                //logado
                <div className="flex gap-4 items-center">
                    <p>{session.user.name}</p>
                    <form action={async () => {
                    'use server';
                    await signOut();
                }}>
                    <button className="cursor-pointer bg-gray-600 hover:bg-gray-500 text-white py-1 px-6 rounded">Sair</button>
                </form>
                </div>
            ) : (
                //deslogado
                <form action={async () => {
                    'use server';
                    await signIn();
                }}>
                    <button className="cursor-pointer bg-gray-600 hover:bg-gray-500 text-white py-1 px-4 rounded">Entrar</button>
                </form>
            ) }
        </div>
        
    </div>
  )
}

export default Navbar;
