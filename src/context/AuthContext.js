import React, { useState, createContext } from "react";

export const AuthContext = createContext({
    userData: undefined,
    login: () => {},
    logout: () => {},
});

export function AuthProvider(props) {
    //En este caso, el hijo es toda la aplicación.
    const { children } = props;
    const [userData, setUserData] = useState(undefined);

    //Función que guarda las credenciales del usuario para reutilizarlas
    //en el resto de componentes de la aplicación.
    const login = (userData) => {
        setUserData(userData);
    };

    //Función que se llama al salir voluntariamente de la aplicación
    const logout = () => {
        setUserData(undefined);
    };

    //Contexto para acceder a las funciones desde los componentes hijos
    const valueContext = {
        userData,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>
    );
}
