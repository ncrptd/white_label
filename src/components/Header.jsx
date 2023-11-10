import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
    const { logout, user } = useAuth();

    const navigate = useNavigate();
    const handleLogout = () => {
        logout(navigate)
    }

    return (
        <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <div className="text-lg font-bold">{user?.name}</div>
            <div className="flex items-center gap-2 ">
                <div className="w-10 h-10 rounded-full bg-white flex justify-center items-center text-black ">
                    <span className="font-bold">
                        {user?.name.slice(0, 1).toUpperCase()}
                    </span>
                </div>
                <Link to='/nameUpdate' className="bg-green-500 text-white-800 py-2 px-4 rounded">Edit</Link>
                <button className="bg-red-500 text-white-800 py-2 px-4 rounded" onClick={handleLogout}>Logout</button>
            </div>
        </header>
    );
};

export default Header;
