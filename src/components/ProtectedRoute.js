import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import {Navigate} from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const { authenticate } = useContext(AuthContext);

    // If the user is not authenticated redirect to the home page
    if (!authenticate) {
        return <Navigate to="/"/>;
    }

    return children;
};
export default ProtectedRoute;