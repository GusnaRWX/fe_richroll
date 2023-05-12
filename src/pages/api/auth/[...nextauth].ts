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
    async signIn({ account, user }) {
      const { name, email } = user;
      if (account?.provider === 'google' || account?.provider === 'facebook') {
        try {
          const response = await fetch(`${config.API_URL}authentication/callback`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: name,
              email: email,
              provider: account.provider === 'facebook' ? 2 : 1
            })
          });


          if (response.ok && user) {
            const user = await response.json();
            // const jwtToken = jwt.sign(user, process.env.JWT_SECRET as string, {
            //   expiresIn: '7d', // Set your desired token expiration time
            // });

            // Set the JWT token as a cookie
            // setCookie(null, 'accessToken', jwtToken, {
            //   maxAge: 7 * 24 * 60 * 60, // Set the same expiration time as the JWT token
            //   path: '/', // Set the cookie path to be accessible from all pages
            //   secure: process.env.NODE_ENV === 'production', // Set the secure flag for HTTPS in production
            // });
            return user;
          } else return null;
        } catch (err) {
          console.log(err);
        }
      }
      return true;
    },
    // async jwt({ token, account, profile, user }) {
    //   console.log(token, 'token dari mana ini');
    //   console.log(account, 'account');
    //   console.log(profile, 'profile');
    //   console.log(user, 'user anjing');
    //   // return { ...token, ...user };
    // },
    // async session({ session, token, user }) {
    //   console.log(first);
    // Send properties to the client, like an access_token and user id from a provider.
    // session.accessToken = token.accessToken;
    // session.user.id = token.id;

    // return session;
    // }
  },

  // async jwt({ token, account, profile }) {
  //   if (account) {
  //     token.accessToken = account.access_token;
  //   } else if ((profile as any)?.accessToken) {
  //     token.accessToken = (profile as any)?.accessToken ?? null;
  //   }

  //   const { accessToken } = token;
  //   console.log(token, 'token');
  //   const encodedToken = jwt.sign({ accessToken }, process.env.JWT_SECRET as string);

  //   return {
  //     ...token,
  //     accessToken: encodedToken,
  //   };
  // },
  // async session({ session, token }) {
  //   (session as any).accessToken = token?.accessToken ?? null;
  //   return session;
  // }
};


export default NextAuth(authOptions);