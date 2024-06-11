import React, { useState } from "react";
import { useRouter } from "next/router";
import { signIn, useSession } from 'next-auth/react'

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const { data: session, status } = useSession();

  if(status === "authenticated") 
    router.push('/dashboard')

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email: email,
        password: password,
        callbackUrl: `${window.location.origin}`
      })

    } catch (error) {
      alert('error')
    }
      
  }

  const handleForgotPassword = () => {
    console.log("Forgot Password clicked");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Login To Executive MIT
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500">{error}</p>}
          <div>
            <label htmlFor="email" className="block font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded focus:outline-none"
            >
              Login
            </button>
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-blue-500 hover:text-blue-600 focus:outline-none"
            >
              Forgot Password?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
