import NextAuth, { AuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google'; // Add Google Provider

export const authOptions: AuthOptions = {
  debug: process.env.NODE_ENV === 'development',
  providers: [
    // Email/Password Credentials Provider
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'jsmith@email.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });

          const response = await res.json();

          if (res.ok && response.data) {
            return response.data;
          } else {
            throw new Error(response.message || 'Login failed');
          }
        } catch (error: any) {
          throw new Error(error.message || 'Login failed');
        }
      },
    }),

    // Add Google OAuth Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: 'openid email profile https://www.googleapis.com/auth/gmail.readonly',
          access_type: 'offline',
          prompt: 'consent',  
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      // Check if the user is signing in with Google
      
      if (account?.provider === "google") {
        console.log("Google account:", account);
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/google`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              googleIdToken: account.id_token, // Use Google ID token
              googleAccessToken: account.access_token, // Google Access token
              googleRefreshToken: account.refresh_token, // Google Refresh token
            }),
          });
          
          const response = await res.json();
          if (response.tokens) {
            // Save user and tokens from the backend response
            token.provider = 'google';
            token.gUser = response.user;
            (token.gUser as any).accessToken = response.tokens.accessToken;
           (token.gUser as any).refreshToken = response.tokens.refreshToken;
          } else {
            throw new Error(response.message || 'Google authentication failed');
          }
        } catch (error) {
          console.error("Error during Google sign-in on the backend:", error);
          throw new Error('Failed to process Google sign-in');
        }
      }
  
      // Keep existing user in token if it's set
      if (user) {
        token.user = user as any;
        
      }
  
      return token;
    },
  
    async session({ session, token }: { session: any, token: any }) {
      if (token.provider === 'google') {
        session.user = token.gUser;
        session.tokens = {
          accessToken: token.gUser.accessToken,
          refreshToken: token.gUser.refreshToken,
        };  
        return session;
      } else {

        session.user = (token.user as any).user as User;
        session.tokens = (token.user as any).tokens as any;
        return session;
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/signin',
    error: '/signin', // Redirect to sign-in page on error
  },
};

export default NextAuth(authOptions);
