import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
const NameUpdate = () => {
    const { user, updateName } = useAuth();
    const [first, last] = user.name.split(' ');

    const [firstName, setFirstName] = useState(first);
    const [lastName, setLastName] = useState(last);
    const navigate = useNavigate();

    const handleUpdate = async () => {
        try {
            await updateName({ firstName, lastName, email: user?.email })
            navigate('/');
        } catch (error) {
            console.error(error)
        }
    };

    return (
        <div className="container mx-auto mt-8">
            <div className="max-w-md mx-auto bg-white p-8 border shadow-md rounded-md">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                        First Name:
                    </label>
                    <input
                        type="text"
                        id="firstName"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter your first name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                        Last Name:
                    </label>
                    <input
                        type="text"
                        id="lastName"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter your last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={handleUpdate}
                >
                    Update
                </button>
            </div>
        </div>
    );
};

export default NameUpdate;
