import { z } from 'zod';

{/* constants(on the database) start */}
export const UserCs = {
    ID_MIN: 6,
    ID_MAX: 24,
    USER_HASHED_PW_LENGTH: 60,
}
{/* constants(on the database) end */}

{/* schemas(on the database) start */}
export const UserSchema = z.object({
    id:
      z.string()
      .min(UserCs.ID_MIN,
        { message: `ID must be at least ${UserCs.ID_MIN} characters long.`})
      .max(UserCs.ID_MAX,
        { message: `ID must be no more than ${UserCs.ID_MAX} characters long.`})
      .regex(/^[A-Za-z0-9_]+$/,
        { message: 'ID must contain only English characters, numbers, and underscores.'}),

    hashed_pw:
      z.string()
      .length(UserCs.USER_HASHED_PW_LENGTH,
        { message: `Password must be ${UserCs.USER_HASHED_PW_LENGTH} characters long.`}),
    
    created_at: z.date(), // default current_timestamp
});
export type User = z.infer<typeof UserSchema>;
{/* schemas(on the database) end */}





{/* constants(not on the database) start */}
export const UnhashedPwCs = {
    UNHASHED_PASSWORD_MIN: 8,
    UNHASHED_PASSWORD_MAX: 48,
}
{/* constants(not on the database) end */}

{/* schemas(not on the database) start */}
export const UnhashedPWSchema = z.string()
    .min(UnhashedPwCs.UNHASHED_PASSWORD_MIN,
        { message: `Password must be at least ${UnhashedPwCs.UNHASHED_PASSWORD_MIN} characters long.`})
    .max(UnhashedPwCs.UNHASHED_PASSWORD_MAX,
        { message: `Password must be no more than ${UnhashedPwCs.UNHASHED_PASSWORD_MAX} characters long.`})
    .regex(/[A-Za-z]/,
      { message: 'Password must contain at least one English character.'})
    .regex(/[0-9]/,
      { message: 'Password must contain at least one number.'})
    .regex(/[^A-Za-z0-9]/,
      { message: 'Password must contain at least one special character.'});
export type UnhashedPW = z.infer<typeof UnhashedPWSchema>;
{/* schemas(not on the database) end */}