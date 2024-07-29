import NextAuth, { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith@email.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) { 
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
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
  ],
  callbacks: {
      async jwt({ token, user }) {
      if (user) {
        token.user = user as any;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user.user as User;
      session.tokens = token.user.tokens as any;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin", 
    error: "/signin", // Redirect to sign-in page on error
  },
};

export default NextAuth(authOptions);
