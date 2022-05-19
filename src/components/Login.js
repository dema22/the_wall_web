import {Button, TextField} from "@mui/material";
import axios from "axios";
import { useState  } from "react";
import {Navigate} from "react-router-dom";
import jwt_decode from "jwt-decode";

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [navigate, setNavigate] = useState(false);

    const submitLogIn = async (e) => {
        e.preventDefault();
        // Send request to the API to create a user
        const response = await axios.post('token/', {
            username,password
        });
        console.log(response.data);
        // Every request after we log in will have the authorization header with the Bearer token.
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data['access']}`;
        // Should Save the access token and refresh token in localstorage. And i save the claim (userId)
        const token = response.data.access;
        const decodedToken = jwt_decode(token);
        //console.log(token);
        //console.log(decodedToken.user_id);
        localStorage.setItem('accessToken', response.data.access);
        localStorage.setItem("refreshToken", response.data.refresh);
        localStorage.setItem('userId', decodedToken.user_id);
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