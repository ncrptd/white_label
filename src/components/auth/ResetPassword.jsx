import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const { resetPassword } = useAuth();
    const param = useParams();
    const navigate = useNavigate();

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleChangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage('Passwords do not match.');
            return;
        }

        try {
            await resetPassword({ password, confirmPassword }, param?.token);
            navigate('/login')
            setMessage('Password updated successfully.');
        } catch (error) {
            console.error('Password update failed', error.message);
            setMessage('Password update failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
                <h2 className="text-2xl font-bold mb-6">Reset Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                            New Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={handleChangePassword}
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
                            value={confirmPassword}
                            onChange={handleChangeConfirmPassword}
                            className="mt-1 p-2 w-full border border-gray-300 rounded"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue mt-2"
                    >
                        Update Password
                    </button>

                    {message && (
                        <div className="mt-2 text-gray-600">
                            {message}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
