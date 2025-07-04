import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { neon } from "@neondatabase/serverless";
import bcrypt from 'bcrypt';

import { authConfig } from '@/auth.config';
import { UserSchema, UnhashedPWSchema } from '@/app/lib/tables/Ctables';

const AuthorizeParamSchema = z.object({
  id: UserSchema.shape.id,
  unhashed_pw: UnhashedPWSchema
});
export type AuthorizeParam = z.infer<typeof AuthorizeParamSchema>;

const getNeonConnectionSF = async () => {
  'use server';

  try {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL is not set");
    }
    return neon(process.env.DATABASE_URL);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getUserSF = async (user_id: string) => {
  'use server';

  try{
    const sql = await getNeonConnectionSF();

    const user = await sql`
      SELECT id, hashed_pw
      FROM users
      WHERE id = ${user_id}
    `;

    return user[0];
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,

  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedParam = AuthorizeParamSchema.safeParse(credentials);
        if (!parsedParam.success) {
          return null;
        }

        const validCredentials = parsedParam.data;

        const user = await getUserSF(validCredentials.id);
        if (!user) {
          return null;
        }

        const isPasswordMatched = await bcrypt.compare(validCredentials.unhashed_pw, user.hashed_pw);
        if (!isPasswordMatched) {
          return null;
        }

        return {
          id: user.id,
        };
      },
    }),
  ],
});