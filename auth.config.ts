import type { DefaultSession, NextAuthConfig } from 'next-auth';

import type { User as CTableUser} from '@/app/lib/tables/Ctables';

declare module "next-auth" {
  interface User {
    id: CTableUser["id"]
  }
  
  interface Session {
    user: {
      id: CTableUser["id"]
    } & DefaultSession["user"]
  }
}

export const authConfig = {
  session: {
    strategy: 'jwt',
    updateAge: 86400, //1 day
    maxAge: 2592000, //1 month
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token;
    },
    
    session({ session, token }) {
      if (typeof token.id === 'string') {
        session.user.id = token.id
      }
      return session;
    }
  },

  providers: [],
} satisfies NextAuthConfig;