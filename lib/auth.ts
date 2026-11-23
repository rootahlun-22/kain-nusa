import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { readData } from "./store";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;
        const data = readData();
        const admin = data.admins.find(
          (a) => a.email === credentials.email && a.password === credentials.password
        );
        if (!admin) return null;
        // Fallback: env admin juga diterima
        const envEmail = process.env.ADMIN_EMAIL;
        const envPass = process.env.ADMIN_PASSWORD;
        if (credentials.email === envEmail && credentials.password === envPass) {
          return { id: "env-admin", email: credentials.email, name: "Admin" };
        }
        return { id: admin.id, email: admin.email, name: "Admin" };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) (token as { isAdmin?: boolean }).isAdmin = true;
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { isAdmin?: boolean }).isAdmin =
          (token as { isAdmin?: boolean }).isAdmin ?? false;
      }
      return session;
    },
  },
};
