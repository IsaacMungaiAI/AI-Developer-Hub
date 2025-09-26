import { NextAuthOptions } from "next-auth";
import GithubProvider, { GithubProfile } from "next-auth/providers/github";
import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, profile }) {
      if (!user.email) return false;

      // Check if user already exists
      const existing = await db
        .select()
        .from(users)
        .where(eq(users.email, user.email));

      if (existing.length === 0) {
        // Insert new user
        await db.insert(users).values({
          name: user.name,
          email: user.email,
          image: user.image,
          // GitHub-specific field
          login: (profile as GithubProfile).login,
        });
      } else {
        // Update existing user
        await db
          .update(users)
          .set({
            name: user.name,
            image: user.image,
            login: (profile as GithubProfile).login,
          })
          .where(eq(users.email, user.email));
      }

      return true;
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.accessToken = account.access_token;
        token.login = (profile as GithubProfile).login;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      if (token.login) {
        session.user.login = token.login as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

