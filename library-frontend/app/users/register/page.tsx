"use client"

import Loading from "@/app/common/loading";
import { useState } from "react";
import { saveUserEndpoint } from "../endpoints/userendpoint";

export default function RegisterUser() {
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [secondPassword, setSecondPassword] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)


    const [email, setEmail] = useState('')

    const saveUser = async () => {
        if (password != secondPassword) {
            setMessage('Both password should be the same')
            return
        }
        setLoading(true)
        const result = await saveUserEndpoint(username, email, password)
        clearFields();
        setMessage('Saved User!')
        setLoading(false)
        
    }


    const clearFields = () => {
        setEmail('')
        setUserName('')
        setPassword('')
        setSecondPassword('')
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            { loading && <Loading /> }
            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
                    Save User
                </h1>
                <div className="space-y-5">
                    <div>
                        <label className="block text-gray-700 mb-2">Username</label>
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
                        <label className="block text-gray-700 mb-2">Username</label>
                        <input
                            id="email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="correo@correo.com"
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
                    <div>
                        <label className="block text-gray-700 mb-2" htmlFor="secondPasword">
                            Confirm Password
                        </label>
                        <input
                            id="secondPassword"
                            type="password"
                            value={secondPassword}
                            onChange={(e) => setSecondPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="••••••••"
                        />
                    </div>
                    {message && <p className="text-sm text-center">{message}</p>}
                    <button 
                        type="button"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-color"
                        onClick={() => saveUser()}
                    >
                        Save User
                    </button>
                </div>
            </div>
        </div>
    )
}