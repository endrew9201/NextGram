'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type MobileMenuProps = {
  user: any;
  onSignOut: () => void;
};

const MobileMenu = ({ user, onSignOut }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2 cursor-pointer">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl py-2 px-4">
          {user ? (
            <>
              <div className="flex items-center gap-2 py-2 border-b border-gray-700">
                {user.image && (
                  <Image
                    src={user.image}
                    alt={`Perfil de: ${user.name}`}
                    className="w-8 h-8 rounded-full"
                    width={32}
                    height={32}
                  />
                )}
                <p className="text-white font-medium">{user.name}</p>
              </div>
              <Link
                href="/profile"
                className="block py-2 text-white hover:text-gray-300"
                onClick={() => setIsOpen(false)}
              >
                Perfil
              </Link>
              <Link
                href="/post/new"
                className="block py-2 text-white hover:text-gray-300"
                onClick={() => setIsOpen(false)}
              >
                Criar postagem
              </Link>
              <Link
                href="/myPosts"
                className="block py-2 text-white hover:text-gray-300"
                onClick={() => setIsOpen(false)}
              >
                Minhas postagens
              </Link>
              <button
                onClick={() => {
                  onSignOut();
                  setIsOpen(false);
                }}
                className="cursor-pointer w-full text-left py-2 text-red-500 hover:text-red-400"
              >
                Sair
              </button>
            </>
          ) : (
            <Link
              href="/signin"
              className="block py-2 text-white hover:text-gray-300"
              onClick={() => setIsOpen(false)}
            >
              Entrar
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
