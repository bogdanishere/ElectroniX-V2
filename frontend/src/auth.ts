import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import * as authentification from "@/network/api/authApi";

export const { handlers, signIn, signOut, auth } = NextAuth({
  theme: {
    logo: "/electronics-logo.png",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  trustHost: true,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        try {
          if (!user.email || !user.name) throw new Error("Invalid user data");

          const password = user.name + user.email;

          const response = await authentification.checkExistentClient(
            user.name
          );

          if (response?.existent) {
            const res = await authentification.loginClient(
              user.email,
              password
            );
            token.jwt = res.token;
          } else {
            const res = await authentification.registerClient(
              user.name,
              password,
              user.email,
              user.name,
              user.name
            );
            token.jwt = res.token;
          }
        } catch (error) {
          console.error("JWT Callback Error:", error);
        }
      }
      return token;
    },
    async session({ session, token }) {
      // @ts-expect-error Property 'jwt' is saving in session token
      session.jwt = token.jwt;
      return session;
    },

    async signIn({ user }) {
      if (user && user.email && user.name) {
        return true;
      }
      return false;
    },
  },
});
