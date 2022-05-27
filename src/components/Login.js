import {Button, TextField} from "@mui/material";
import axios from "axios";
import { useState  } from "react";
import {Navigate} from "react-router-dom";
import jwt_decode from "jwt-decode";
import TokenService from "../services/TokenService";
import './Login.css';
import CustomSnackbar from "./CustomSnackbar";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";

export const Login = () => {
    const { saveAuthentication } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [navigate, setNavigate] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const submitLogIn = async (e) => {
        try {
            e.preventDefault();
            // Send request to the API so the user can login
            const response = await axios.post('http://localhost:8000/token/', {
                username, password
            });
            // Save the access token , refresh token in localstorage.
            // Also, we save the user id from the decoded access token.
            const token = response.data.access;
            const decodedToken = jwt_decode(token);
            TokenService.updateLocalAccessToken(response);
            TokenService.updateLocalRefreshToken(response);
            TokenService.updateUserId(decodedToken.user_id);
            setNavigate(true);
            // saved authentication in context.
            saveAuthentication();
        } catch(err) {
            console.log(err.response.data.detail);
            // We save the error message for the snackbar.
            setErrorMessage(err.response.data.detail);
            e.target.reset();
        }
    }

    // We redirect the user to the profile page, if the log in was a success.
    if(navigate) {
        return <Navigate to={"/profile"}/>
    }

    const handleClose = () => {
        setErrorMessage('');
    }

    return <div className="container">
        <form onSubmit={submitLogIn} className="login-container">
            <p>Log In</p>
            <TextField required margin="dense" label={'Username'} onChange={ e => setUsername(e.target.value) } className="textfield"/>
            <TextField type="password" required margin="dense" label={'Password'} onChange={ e => setPassword(e.target.value) } className="textfield"/>
            <Button variant="contained" size="medium" type="submit">Submit</Button>
        </form>
        {errorMessage && <CustomSnackbar onClose={handleClose} open={true} message={errorMessage} />}
    </div>
}