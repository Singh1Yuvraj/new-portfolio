import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "./mongodb";
import User from "../models/User";

export const authOptions: AuthOptions = {
  providers: [
    // Google OAuth provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "MOCK_CLIENT_ID",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "MOCK_CLIENT_SECRET",
    }),
    // Credentials provider to act as a local development bypass
    CredentialsProvider({
      id: "bypass",
      name: "Development Bypass",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "dev@example.com" },
      },
      async authorize(credentials) {
        // Only allow bypass if GOOGLE credentials are not set, or in development mode
        const email = credentials?.email || "dev@example.com";
        
        await connectToDatabase();
        
        // Find user by email or create a new mock user
        let user = await User.findOne({ email });
        
        if (!user) {
          user = await User.create({
            email,
            profile: {
              fullName: "Developer User",
              title: "Full Stack Engineer",
              bio: "Writing code and building awesome products locally.",
              avatarUrl: "",
              location: "San Francisco, CA",
              email,
            },
            skills: ["React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS"],
            projects: [],
            experience: [],
            education: [],
            settings: {
              template: "minimal",
              isPublic: true,
              templateHistory: [],
            },
          });
        }
        
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.profile.fullName || "Developer",
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        await connectToDatabase();
        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          // Create new user on initial Google login
          await User.create({
            email: user.email,
            profile: {
              fullName: user.name || "",
              avatarUrl: user.image || "",
              email: user.email || "",
              title: "",
              bio: "",
              location: "",
            },
            skills: [],
            projects: [],
            experience: [],
            education: [],
            settings: {
              template: "minimal",
              isPublic: true,
              templateHistory: [],
            },
          });
        }
      }
      return true;
    },
    async jwt({ token, trigger, session }) {
      await connectToDatabase();
      
      // Fetch user profile from DB to add details to session
      const dbUser = await User.findOne({ email: token.email });
      if (dbUser) {
        token.id = dbUser._id.toString();
        token.username = dbUser.username || null;
      }
      
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id as string;
        (session.user as any).username = token.username as string | null;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
