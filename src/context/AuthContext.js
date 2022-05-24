import { createContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider ({ children }) {
    const [authenticate, setAuthenticate] = useState(false);

    const userIsAuthenticated = () => {
        console.log("entrando a poner en true en context")
        setAuthenticate(true);
    };

    const userNotAuthenticated = () => {
        console.log("entrando a poner en false en context")
        setAuthenticate(false);
    }

    return (
        <AuthContext.Provider value={ { authenticate, userIsAuthenticated, userNotAuthenticated }}>{children}</AuthContext.Provider>
    );
}
export default AuthContext;