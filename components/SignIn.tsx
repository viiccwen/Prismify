/* eslint-disable @next/next/no-img-element */
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import Input from './form/Input'
import { Button } from './ui/Button'
import { cn } from '@/utils/buttonUtils'
import { signIn } from 'next-auth/react'

export default function SignIn() {
  const [data, setData] = useState({ email: '', password: '' })

  const router = useRouter()

  const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    })
  }

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md space-y-10 p-6">
        <div>
          <h1 className="text-center text-4xl font-semibold text-gray-800 dark:text-dark sm:font-bold">
            Sign in to{' '}
            <button
              onClick={() => router.push('/')}
              className="bg-gradient-to-br from-[#898AEB] via-[#898dd9]/80 to-[#8e8ece] bg-clip-text text-transparent "
            >
              Prismify
            </button>
          </h1>
        </div>
        <form onSubmit={loginUser} className="space-y-8">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-dark/70"
            >
              Email address
            </label>
            <div className="mt-2">
              <Input
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                id="email"
                name="email"
                type="email"
                required
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-dark/70"
            >
              Password
            </label>
            <div className="mt-2">
              <Input
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                id="password"
                name="password"
                type="password"
                required
              />
            </div>
          </div>
          <div>
            <Button
              className={cn(
                'flex w-full items-center justify-center rounded-md bg-gray-200 px-4 py-3 text-sm font-medium'
              )}
              size={'lg'}
              onClick={() => {}}
            >
              Sign in
            </Button>
          </div>

          {/* Continue with separator */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-800" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-primary px-2 text-primary dark:bg-dark dark:text-dark/80">
                Or continue with
              </span>
            </div>
          </div>

          {/* Provider buttons */}
          <div className="mt-6 grid grid-cols-3 gap-3">
            <div>
              <button className="inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0 dark:bg-[#2C2E3B] dark:ring-gray-700">
                <span className="sr-only">Sign in with Facebook</span>
                <img
                  className="h-5 w-5"
                  src="https://img.icons8.com/color/48/000000/facebook-new.png"
                  alt="Facebook logo"
                />
              </button>
            </div>

            <div>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  signIn('google')
                }}
                className="inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0 dark:bg-[#2C2E3B] dark:ring-gray-700 "
              >
                <span className="sr-only">Sign in with Google</span>
                <img
                  className="h-5 w-5"
                  src="https://img.icons8.com/color/48/000000/google-logo.png"
                  alt="github"
                />
              </button>
            </div>

            <div>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  signIn('github')
                }}
                className="inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0 dark:bg-[#2C2E3B] dark:ring-gray-700 "
              >
                <span className="sr-only">Sign in with GitHub</span>
                <img
                  className="h-5 w-5"
                  src="https://img.icons8.com/fluency/48/000000/github.png"
                  alt="github"
                />
              </button>
            </div>
          </div>
          <p className="mt-3 text-center text-sm text-gray-600 dark:text-dark/80">
            Dont have an account?{' '}
            <a
              href="/sign-up"
              className="font-medium text-purple hover:text-purple/90 hover:underline"
            >
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  )
}
