import {
    createBrowserRouter,
    createRoutesFromElements,
    Route
} from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./components/auth/Signup";
import RequiresAuth from './components/auth/RequiresAuth'
import RootLayout from "./layouts/RootLayout";
import Login from "./components/auth/Login";
import ResetPassword from "./components/auth/ResetPassword";
import ForgotPassword from "./components/auth/ForgotPassword";
import NameUpdate from "./components/NameUpdate";
import RequiresRole from "./components/auth/RequiresRole";
import UserManagement from "./components/admin/UserManagement";
import AddUser from "./components/admin/AddUser";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<RootLayout />}>
            <Route index element={<RequiresAuth>
                <Home />
            </RequiresAuth>} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/resetPassword/:token" element={<ResetPassword />} />
            <Route path="/forgotPassword/" element={<ForgotPassword />} />
            <Route path="/nameUpdate" element={
                <RequiresAuth>
                    <NameUpdate />
                </RequiresAuth>

            } />
            <Route path="/admin/userManagement" element={
                <RequiresAuth>
                    <RequiresRole>
                        <UserManagement />
                    </RequiresRole>
                </RequiresAuth>
            } />
            <Route path="/admin/create" element={
                <RequiresAuth>
                    <RequiresRole>
                        <AddUser />
                    </RequiresRole>
                </RequiresAuth>
            } />
        </Route>
    )
);