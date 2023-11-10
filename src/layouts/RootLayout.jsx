import { Outlet } from "react-router-dom";

function RootLayout() {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow">
                <Outlet />
            </div>
        </div>
    );
}

export default RootLayout;
