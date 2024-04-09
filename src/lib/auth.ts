import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectToDB } from './db';
import { Admin } from './models';
import bcrypt from 'bcryptjs';
import { authConfig } from './auth.config';

const login = async (credentials: any) => {
  try {
    connectToDB();
    const admin = await Admin.findOne({ username: credentials.username });

    if (!admin) throw new Error('Wrong credentials!');

    const isPasswordCorrect = await bcrypt.compare(credentials.password, admin.password);

    if (!isPasswordCorrect) throw new Error('Wrong credentials!');

    return admin;
  } catch (err) {
    console.log(err);
    throw new Error('Failed to login!');
  }
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      async authorize(credentials: any) {
        try {
          const admin = await login(credentials);
          return admin;
        } catch (err) {
          return null;
        }
      },
    }),
  ],
});
