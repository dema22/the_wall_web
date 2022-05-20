import {Button, TextField} from "@mui/material";
import axios from "axios";
import { useState  } from "react";
import {Navigate} from "react-router-dom";
import jwt_decode from "jwt-decode";
import TokenService from "../services/TokenService";

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [navigate, setNavigate] = useState(false);

    const submitLogIn = async (e) => {
        e.preventDefault();
        // Send request to the API so the user can login
        const response = await axios.post('http://localhost:8000/token/', {
            username,password
        });
        // Save the access token , refresh token in localstorage, and user id from decoded token.
        const token = response.data.access;
        const decodedToken = jwt_decode(token);
        TokenService.updateLocalAccessToken(response);
        TokenService.updateLocalRefreshToken(response);
        TokenService.updateUserId(decodedToken.user_id);
        setNavigate(true);
    }

    if(navigate) {
        return <Navigate to={"/"}/>
    }

    return <div>Log In
        <form onSubmit={submitLogIn}>
            <TextField label={'Username'} onChange={ e => setUsername(e.target.value) } />
            <TextField label={'Password'} onChange={ e => setPassword(e.target.value) }/>
            <Button type="submit">Submit</Button>
        </form>
    </div>
}