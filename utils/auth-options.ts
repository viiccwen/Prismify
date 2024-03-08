import { PrismaAdapter } from '@next-auth/prisma-adapter'
import {
  type NextAuthOptions,
  type DefaultSession,
  getServerSession,
} from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import prismadb from '@/libs/prismadb'
import bcrypt from 'bcrypt'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string
      isCreator: boolean
    } & DefaultSession['user']
  }
}

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/',
    error: '/error',
  },
  adapter: PrismaAdapter(prismadb),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'hello@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any) {
        if (!credentials) {
          throw new Error('No credentials')
        }

        if (!credentials.email || !credentials.password) {
          throw new Error('Missing credentials')
        }

        const user = await prismadb.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user || !user?.hashedPassword) {
          throw new Error("User doesn't exist")
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        )

        // const passwordMatch = credentials.password === user.hashedPassword

        if (!passwordMatch) {
          throw new Error('Incorrect password')
        }

        return user
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, session }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          // @ts-expect-error isCreator is there but its not showing
          isCreator: user?.isCreator,
        }
      }

      return token
    },
    async session({ session, token, user }) {
      // console.log('session', session, token)
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          isCreator: token.isCreator,
        },
      }
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
}

/** Reusable function to eliminate the need of passing authOptions everytime */
export const getCurrentSession = () => getServerSession(authOptions)
