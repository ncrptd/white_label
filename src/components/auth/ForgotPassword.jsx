import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [sending, setSending] = useState(false)
    const { sendPasswordResetEmail } = useAuth();

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSending(true);
            await sendPasswordResetEmail(email);
            setSending(false)
            setMessage('Password reset link sent to your email. Please check your inbox.');
        } catch (error) {
            setSending(false)
            console.error('Password reset link sending failed', error.response.data.message);
            setMessage(`Password reset link sending failed. ${error.response.data.message}`);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
                <h2 className="text-2xl font-bold mb-6">Forgot Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue mt-2"
                    >
                        Send Reset Link
                    </button>

                    {message && (
                        <div className="mt-2 text-gray-600">
                            {sending && <p>Sending...</p>}
                            {!sending && message}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
