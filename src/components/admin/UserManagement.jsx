// UserManagement.jsx

import { Link } from "react-router-dom";
import { useAdminContext } from "../../context/AdminContext";

const UserManagement = () => {
    const { state, deleteUser, tempDeleteUser } = useAdminContext();
    const { users } = state;

    const handleDeletePermanently = (userId) => {
        deleteUser(userId)
        console.log(`Deleting user permanently with ID: ${userId}`);
    };

    const handleDeleteTemporarily = (userId) => {
        tempDeleteUser(userId)
        console.log(`Deleting user temporarily with ID: ${userId}`);
    };


    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4 text-center">User Management</h2>
            <div className="flex justify-end py-2">
                <Link to='/admin/create'
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                >
                    Create User
                </Link>
            </div>
            <table className="mx-auto min-w-full bg-white border border-gray-300 shadow-md">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 px-4 border-b">User Name</th>
                        <th className="py-2 px-4 border-b">Email</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id} >
                            <td className={`py-2 px-4 border-b ${user?.temporaryDelete ? 'text-red-500' : null}`}>{user.name}</td>
                            <td className={`py-2 px-4 border-b ${user?.temporaryDelete ? 'text-red-500' : null}`}>{user.email}</td>
                            <td className="py-2 px-4 border-b flex items-center space-x-2">
                                <button
                                    onClick={() => handleDeletePermanently(user._id)}
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                >
                                    Delete Permanently
                                </button>
                                <button
                                    onClick={() => handleDeleteTemporarily(user._id)}
                                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                                >
                                    Delete Temporarily
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserManagement;
