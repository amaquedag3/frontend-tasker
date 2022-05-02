import React, { useState, createContext } from "react";

export const AuthContext = createContext({
    userData: undefined,
    login: () => {},
    logout: () => {},
});

export function AuthProvider(props) {
    const { children } = props; //La aplicación en sí
    const [userData, setUserData] = useState(undefined);

    const login = (userData) => {
        setUserData(userData);
    };

    const logout = () => {
        setUserData(undefined);
    };

    const valueContext = {
        userData,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>
    );
}
