import { createContext, useState } from 'react';
import TokenService from "../services/TokenService";

const AuthContext = createContext();

export function AuthProvider ({ children }) {
    // We are going to check if we have a user id saved in local storage. If we have, it means the user is authenticated, else is not.
    const getInitialAuth = TokenService.getUserId() ? true : false;
    const [authenticate, setAuthenticate] = useState(getInitialAuth);

    const saveAuthentication = () => {
        setAuthenticate(true);
    };

    const removeAuthentication = () => {
        setAuthenticate(false);
    }

    return (
        <AuthContext.Provider value={ { authenticate, saveAuthentication, removeAuthentication }}>{children}</AuthContext.Provider>
    );
}
export default AuthContext;