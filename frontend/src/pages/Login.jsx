import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })


    const handleChange = (e) => {
        const { name, value } = e.target

        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const loging = await axios.post('http://127.0.0.1:8000/api/accounts/token/', formData)
            localStorage.setItem("token", loging.data.access)
            
        } catch (error) {
            console.error(error.response.data);
        }
    }

    return (
        <div>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="email"
                            placeholder="EMail"
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            name='password'
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />

                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                        >
                            Login
                        </button>
                    </form>

                    <p className="text-sm text-center mt-4">
                        Don't have an account?{" "}
                        <a onClick={() => navigate('/signup')} className="text-blue-500">
                            Signup
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login