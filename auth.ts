import type { NextAuthConfig } from 'next-auth';
import NextAuth from 'next-auth';

import Google from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const config = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  providers: [Google],
  callbacks: {
    session({ session, token }) {
      if (token.sub) session.user.userid = token.sub;
      return session;
    },
  },
  pages: {
    signIn: '/signIn',
  },
} satisfies NextAuthConfig; /*  */

export const { handlers, auth, signIn, signOut } = NextAuth(config);

//Providers => Minha página

interface ProviderWithId {
  id: string;
  name: string;
}

//mapear os providers
export const providerMap = config.providers.map((provider) => {
  const typedProvider = provider as unknown as ProviderWithId;
  return {
    id: typedProvider.id,
    name: typedProvider.name,
  };
});
