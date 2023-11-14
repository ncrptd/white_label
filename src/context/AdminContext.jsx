/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import { createContext, useContext, useEffect, useReducer } from 'react';
import adminReducer, { ADMIN_ACTION } from '../reducers/adminReducer';
import axios from 'axios';


const AdminContext = createContext();


const initialState = {
    users: []
}

export const AdminProvider = ({ children }) => {
    const userData = localStorage.getItem('user');
    const [state, dispatch] = useReducer(adminReducer, initialState)

    let token;
    if (userData) {
        token = JSON.parse(userData).token
    }
    const createUser = async (userData) => {
        const headers = {
            authorization: `Bearer ${token}`,
        };
        try {
            const res = await axios.post('https://whitelabellogin.rockeybiswas.repl.co/api/admin/create', userData, { headers });
            if (res.status === 201) {
                const data = res.data;
                dispatch({ type: ADMIN_ACTION.ADD_USER, payload: { user: data.result } })
            }
        } catch (error) {
            console.error(error)
        }
    }
    const getUsers = async () => {
        const headers = {
            authorization: `Bearer ${token}`,
        };
        try {
            const res = await axios.get('https://whitelabellogin.rockeybiswas.repl.co/api/admin/users', { headers });
            if (res.status === 200) {
                const data = res.data;
                dispatch({ type: ADMIN_ACTION.GET_USERS, payload: { users: data.users } })
            }
        } catch (error) {
            console.error(error)
        }
    }
    const deleteUser = async (userId) => {
        try {
            const headers = {
                authorization: `Bearer ${token}`,
            };
            const res = await axios.post(`https://whitelabellogin.rockeybiswas.repl.co/api/admin/delete/${userId}`, null, { headers });
            console.log(res)

            if (res.status === 200) {
                const users = state.users.filter((user) => user._id !== userId);
                dispatch({ type: ADMIN_ACTION.DELETE_USER, payload: { users } })
            }
        } catch (error) {
            console.error(error)
        }
    }
    const tempDeleteUser = async (userId) => {
        try {
            const headers = {
                authorization: `Bearer ${token}`,
            };
            const res = await axios.post(`https://whitelabellogin.rockeybiswas.repl.co/api/admin/temp/delete/${userId}`, null, { headers });

            if (res.status === 200) {
                const users = state.users.map((user) => user._id === userId ? { ...user, temporaryDelete: true } : user);
                dispatch({ type: ADMIN_ACTION.DELETE_USER, payload: { users } })
            }
        } catch (error) {
            console.error(error)
        }
    }
    const adminContextValue = {
        state,
        dispatch,
        createUser,
        getUsers,
        deleteUser,
        tempDeleteUser
    }
    useEffect(() => {
        getUsers();
    }, [])
    return (
        <AdminContext.Provider value={adminContextValue}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdminContext = () => {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error('useAdminContext must be used within an AdminProvider');
    }
    return context;
};

