import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import { config } from '@config';
import { post } from '@/utils/services';

export default NextAuth({
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
      if (account?.provider === 'google' || account?.provider === 'facebook') {
        try {
          const response = await post('authentication/callback', {
            name: user.name,
            email: user.email,
            provider: account.provider === 'facebook' ? 2 : 1
          });
          return response.data;
        } catch (err) {
          console.log(err);
        }
      }
      return true;
    }
  },
});