/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */

import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const userData = localStorage.getItem('user');
    let token;
    if (userData) {
        token = JSON.parse(userData).token
    }
    const [user, setUser] = useState(userData ? JSON.parse(userData).result : null);
    const [error, setError] = useState(null);

    const signup = async (userData, navigate) => {
        try {
            const res = await axios.post('https://whitelabellogin.rockeybiswas.repl.co/api/signup', userData);
            if (res.status === 201) {
                const data = res.data;
                setUser(data.result);
                localStorage.setItem('user', JSON.stringify(data))
                navigate('/')

            }
        } catch (error) {
            console.error('error', error);
        }
    };

    const logout = (navigate) => {
        setUser(null);
        localStorage.clear('user');
        setError(null)
        navigate('/')
    };


    const login = async (formData) => {
        try {
            const res = await axios.post('https://whitelabellogin.rockeybiswas.repl.co/api/signin', formData);
            if (res.status === 200) {
                const data = res.data;
                setUser(data.result);
                localStorage.setItem('user', JSON.stringify(data))
            }
        } catch (error) {
            console.error('error', error)
            setError(error.response.data.message)
        }
    }
    const sendPasswordResetEmail = async (email) => {
        try {
            await axios.post('https://whitelabellogin.rockeybiswas.repl.co/api/forgotPassword', { email });

        } catch (error) {
            console.error(error)
            throw error
        }
    }
    const resetPassword = async (body, token) => {
        try {
            await axios.post(`https://whitelabellogin.rockeybiswas.repl.co/api/resetPassword/${token}`, body);

        } catch (error) {
            console.error(error)
            return error
        }
    }

    const updateName = async (data) => {
        try {
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            const res = await axios.post('https://whitelabellogin.rockeybiswas.repl.co/api/user/updateName', data, { headers });
            if (res.status === 200) {
                const resData = res.data;
                setUser(resData.user);
                const ls = localStorage.getItem('user');
                if (ls) {
                    const token = JSON.parse(ls).token;
                    localStorage.setItem('user', JSON.stringify({ result: resData.user, token }))
                }
            }

        } catch (error) {
            console.error(error);
            setError(error.response.data.message)

        }
    }

    useEffect(() => {
        const token = user?.token;
        if (token) {
            const decoded = jwtDecode(token);
            if (decoded.exp * 1000 < new Date().getTime()) logout()
        }
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData).result);

        }
    }, [user?.token]);

    const authContextValue = {
        user,
        signup,
        logout,
        login,
        sendPasswordResetEmail,
        resetPassword,
        updateName,
        error
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};
export { AuthContext }