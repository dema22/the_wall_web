import {Button, TextField} from "@mui/material";
import axios from "axios";
import { useState  } from "react";
import {Navigate} from "react-router-dom";
import jwt_decode from "jwt-decode";
import TokenService from "../services/TokenService";
import './Login.css';
import CustomSnackbar from "./CustomSnackbar";

export const Login = () => {
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
            // Save the access token , refresh token in localstorage, and user id from decoded token.
            const token = response.data.access;
            const decodedToken = jwt_decode(token);
            TokenService.updateLocalAccessToken(response);
            TokenService.updateLocalRefreshToken(response);
            TokenService.updateUserId(decodedToken.user_id);
            setNavigate(true);
        } catch(err) {
            console.log(err.response.data.detail);
            setErrorMessage(err.response.data.detail);
            e.target.reset();
        }
    }

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