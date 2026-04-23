import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Signup() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        password2: ""
    })


    const handleChange = (e) => {
        const { name, value } = e.target

        setFormData({
            ...formData,
            [name]: value
        })
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const registration = await axios.post('http://127.0.0.1:8000/api/accounts/register/', formData)
            alert("Register successfully!")
            console.log(registration.data);
        } catch (error) {
            console.error(error.response.data);
        }
    }

    return (
        <div>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-bold text-center mb-6">Signup</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            name='username'
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Full Name"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />

                        <input
                            type="email"
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />

                        <input
                            type="password"
                            name='password'
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <input
                            type="password"
                            name='password2'
                            value={formData.password2}
                            onChange={handleChange}
                            placeholder="Conform Password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />

                        <button
                            type="submit"
                            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
                        >
                            Signup
                        </button>
                    </form>

                    <p className="text-sm text-center mt-4">
                        Already have an account?{" "}
                        <a onClick={() => navigate('/')} className="text-blue-500">
                            Login
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Signup