import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import CredentialsProvider from "next-auth/providers/credentials";
import { createData } from "./core/http-service/http-service";
import { VerifyUserModel } from "./app/(auth)/verify/_types/verify-user.type";
import { User, UserSession, UserToken } from "./types/user.interface";
import { API_URL } from "./configs/global";
import { jwtDecode } from "jwt-decode";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    accessToken: string;
  }

  interface Session {
    user: UserSession;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: UserToken;
  }
}

export const {
  signIn,
  signOut,
  auth,
  handlers: { GET, POST },
} = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        mobile: { label: "mobile", type: "text" },
        code: { label: "code", type: "text" },
      },
      async authorize(credentials) {
        try {
          const user = await createData<VerifyUserModel, User>(
            `${API_URL}/auth/check-otp`,
            {
              mobile: credentials.mobile as string,
              code: credentials.code as string,
            }
          );
          // Auth.js expects the user object to be returned
          return {
            accessToken: user?.data?.accessToken,
          };
        } catch (error: unknown) {
          throw new Error("");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = jwtDecode<UserToken>(user.accessToken);
        token.user.accessToken = user.accessToken;
      }

      return token;
    },
    async session({ session, token }) {
      console.log(token);
      Object.assign(session.user, token.user ?? {});
      return session;
    },
  },
});
