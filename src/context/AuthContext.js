import { createContext, useState } from 'react';
import TokenService from "../services/TokenService";

const AuthContext = createContext();

export function AuthProvider ({ children }) {
    // We are going to check if we have a user id saved in local storage. If we have, it means the user is authenticated, else is not.
    const getInitialAuth = TokenService.getUserId() ? true : false;
    console.log(getInitialAuth);
    const [authenticate, setAuthenticate] = useState(getInitialAuth);
    console.log(authenticate);

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