'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Loading from '../common/loading'

const SERVER_NAME = process.env.NEXT_PUBLIC_BACKEND_HOST
const PORT = process.env.NEXT_PUBLIC_BACKEND_PORT

export default function Login() {
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  const loginUser = async () => {
    try {
      const URL = `http://${SERVER_NAME}:${PORT}/api/token/`
      setLoading(true)
      const result = await fetch(URL, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({username, password})
      })
      if (!result.ok) {
        const errorData = await result.json();
        setMessage(`❌ Error: ${errorData.error || "Invalid credentials"}`);
        setLoading(false)
        return;
      }
      

      const data = await result.json();

      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);

      document.cookie = `access_token=${data.access}; path=/; max-age=3600; SameSite=Strict`;

      setMessage("✅ Login successful! Redirecting...");
      setLoading(false)

      setTimeout(() => {
        router.push('/authors')
      }, 1000)
    } catch(error) {
      setLoading(false)
      setMessage(`❌ Error: ${error}`);
    }
    
  }



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      { loading && <Loading /> }
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="email">
              User Name
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="User Name"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          <button
            id="btnLogin"
            type="button"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => loginUser()}
          >
            Login
          </button>
          {message && <p className="text-sm text-center">{message}</p>}
        </form>

        <div className="mt-6 text-center text-gray-600 text-sm">
          ¿No tienes cuenta?{' '}
          <a href="#" className="text-blue-600 hover:underline">
            Regístrate
          </a>
        </div>
      </div>
    </div>
  )
}