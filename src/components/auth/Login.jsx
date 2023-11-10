/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const { login, error } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(formData);
            navigate('/');
        } catch (error) {
            console.error('Login failed', error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
                <h2 className="text-2xl font-bold mb-6">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue mt-2"
                    >
                        Login
                    </button>
                    <div className='mt-2'>
                        Don't have an account?
                        <Link to='/signup' className='text-blue-500 ml-2'>
                            Sign Up
                        </Link>
                        <p className="text-gray-600"><Link to="/forgotPassword" className="text-blue-500">Forgot Password?</Link></p>
                    </div>
                    <p className='text-red-500 mt-2 font-bold'>{error}</p>
                </form>
            </div>
        </div>
    );
};

export default Login;
