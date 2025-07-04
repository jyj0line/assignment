"use server";

import { type User, AuthError } from 'next-auth';
import { type AuthorizeParam, signIn, auth, signOut } from '@/auth';
import { AuthentificationCs } from '@/app/lib/descriptions';

export const getUserPSF = async (): Promise<User | null> => {
  'use server';

  try {
    const session = await auth();
    return session?.user ?? null;
  } catch(error) {
    console.error(error);
    return null;
  }
};

export const signInPSF = async (param: AuthorizeParam): Promise<string | undefined> => {
    "use server";
  
    try {
      await signIn('credentials', param);
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return AuthentificationCs.LOG_IN_CREDENTIAL;
          default:
            return AuthentificationCs.LOG_IN_SOMETHING;
        }
      }

      throw error;
    }
  };

export const signOutPSF = async (): Promise<void> => {
    'use server';

    await signOut({ redirectTo: '/' });
}