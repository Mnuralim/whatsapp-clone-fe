import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session }) {
      const response = await fetch(`${process.env.API_URL}/api/v1/users/check-user/${session.user.email}`, {
        cache: "no-store",
      });
      const data = await response.json();
      const sessionUser = data.data.user;
      session.user._id = sessionUser._id;
      session.user.username = sessionUser.username;
      session.user.about = sessionUser.about;
      session.user.image = sessionUser.profile_image;
      return session;
    },

    async signIn({ user }) {
      const { name, email, image } = user;
      const username = email?.split("@")[0];

      const responseData = await fetch(`${process.env.API_URL}/api/v1/users/check-user/${email}`);
      try {
        if (responseData.status === 404) {
          const response = await fetch(`${process.env.API_URL}/api/v1/users/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              username: username,
              displayName: name,
              profileImage: image,
            }),
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(nextAuthOptions);
