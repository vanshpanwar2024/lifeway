import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Since we only need ONE admin, we can use environment variables instead of database logic for auth
        const adminUser = process.env.ADMIN_USER || "admin";
        const adminPass = process.env.ADMIN_PASS || "lifeway@2026";
        
        if (credentials?.username === adminUser && credentials?.password === adminPass) {
          return { id: "1", name: "Admin", email: "admin@lifeway.com" };
        }
        
        return null;
      }
    })
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/admin/login" },
  secret: process.env.NEXTAUTH_SECRET || "lifeway-secret-key-for-local-development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
