import bcrypt from "bcrypt"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import axios from "@/libs/axios"

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' }
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          const response = await axios.post('/api/login', { email, password });
      
          if (response.status === 200) {
            const user = {
              roll: response.data.user.registration_number,
              email: response.data.user.email,
              role: response.data.role,
              token: response.data.token,
            };
             console.log(user)
            return user;
          } else {
            
            return null;
          }
        } catch (error) {
          console.error('Error during login:', error);
          
          throw new Error('Authentication failed');
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  secret: process.env.JWT_SECRET,
  callbacks: {
    async jwt({token, user}) {
      if (user) {
        token = { ...token, user: user };
      }
      return token;
    },
    async session({session, token}) {
      
      session.user = token.user;
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
});