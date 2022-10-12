import { createContext, useState } from 'react';

export const AuthContext = createContext({
    loggedIn: false,
    userId: null
});

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        loggedIn : false,
        userId: ''
    });


    const login = (userId) => {
        setAuth(()=>({
            loggedIn: true,
            userId
        }));
    };

    const logout = ()=>{
        setAuth(()=>({
            loggedIn: false,
            userId: ''
        }));
    }

    return (
        <AuthContext.Provider value={{ ...auth, login, logout }}>
            { children }
        </AuthContext.Provider>
    )
};

export default AuthProvider;