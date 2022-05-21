import { useState  } from "react";
import {Button, TextField} from "@mui/material";
import axios from 'axios';
import { Navigate } from 'react-router-dom';

export const Register = () => {
    const [first_name, setFirstname] = useState('');
    const [last_name, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [navigate, setNavigate] = useState(false);

    const submitRegistration = async (e) => {
        e.preventDefault();
        try {
            // Send request to the API to create a user
            await axios.post('http://localhost:8000/registration/', {
                first_name, last_name, username, email, password
            });
            setNavigate(true);
        } catch(e) {
            console.log("error");
        }
    }

    if(navigate) {
        return <Navigate to={"/login"}/>
    }

    return <div>Register
        <form onSubmit={submitRegistration}>
            <TextField label={'First Name'} onChange={ e => setFirstname(e.target.value) } />
            <TextField label={'Last Name'} onChange={ e => setLastName(e.target.value) }/>
            <TextField label={'Username'} onChange={ e => setUsername(e.target.value) }/>
            <TextField label={'Email'} onChange={ e => setEmail(e.target.value) }/>
            <TextField label={'Password'} onChange={ e => setPassword(e.target.value) }/>
            <Button type="submit">Submit</Button>
        </form>
    </div>
}