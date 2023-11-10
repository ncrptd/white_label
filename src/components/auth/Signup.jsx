import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        signup(formData, navigate);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
                <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-600">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-600">
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded"
                            required
                        />
                    </div>
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
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue mt-2"
                    >
                        Sign Up
                    </button>
                    <div className='mt-2'>
                        Already have an account ?
                        <Link to='/login' className='text-blue-500 ml-2'>

                            Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
