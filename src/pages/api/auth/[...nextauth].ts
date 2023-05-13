/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import { config } from '@config';
// import { setCookie } from 'nookies';
// import { post } from '@/utils/services';
// import jwt from 'jsonwebtoken';
// import { JWT } from 'next-auth/jwt';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: config.GOOGLE_ID as string,
      clientSecret: config.GOOGLE_SECRET as string,

    }),
    FacebookProvider({
      clientId: config.FACEBOOK_ID as string,
      clientSecret: config.FACEBOOK_SECRET as string,
    }),
  ],
  secret: config.NEXTAUTH_SECRET,
  callbacks: {
    signIn: async function ({account, user}) {
      const {name, email} = user;
      const response = await fetch(`${config.API_URL}authentication/callback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          provider: account?.provider === 'facebook' ? 2 : 1
        })
      });


      if (response.ok && user) {
        const user = await response.json();
        return Promise.resolve(`/auth/callback?token=${user.data.accessToken}`);
      }

      return true;
    },
  },
};


export default NextAuth(authOptions);