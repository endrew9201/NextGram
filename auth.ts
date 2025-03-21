import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";

import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const config = {
    adapter: PrismaAdapter(prisma),
    session: { strategy: 'jwt'},
    providers: [Google],
    callbacks: {
        authorized({request, auth}){
            const { pathname } = request.nextUrl;

            if(pathname === "/middleware"){
                return !!auth;
            }
            return true;
        },
    }
} satisfies NextAuthConfig;/*  */

export const {handlers, auth, signIn, signOut} = NextAuth(config)


//D do cliente:
//40672959356-rb9eio0d6nrjo8t6st30bufo0sn49of7.apps.googleusercontent.com
//Chave secreta do cliente:
//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