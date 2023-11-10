import { useAuth } from "../context/AuthContext";


const Footer = () => {
    const currentYear = new Date().getFullYear();
    const { user } = useAuth()

    return (
        <footer className="bg-gray-800 text-white p-4 fixed bottom-0 w-full">
            <div className="container mx-auto">
                <div className="flex justify-center items-center">
                    <p>&copy; {currentYear} <span>{user?.name}</span> </p>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
