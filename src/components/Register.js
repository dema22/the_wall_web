import { useState  } from "react";
import {Button, TextField} from "@mui/material";
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import CustomSnackbar from "./CustomSnackbar";
import './Register.css';

export const Register = () => {
    const [first_name, setFirstname] = useState('');
    const [last_name, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [navigate, setNavigate] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const submitRegistration = async (e) => {
        e.preventDefault();
        try {
            // Send request to the API to create a user
            await axios.post('http://localhost:8000/registration/', {
                first_name, last_name, username, email, password
            });
            setNavigate(true);
        } catch(err) {
            if(err.response.data.username !== null) {
                setErrorMessage(err.response.data.username[0]);
                console.log(err.response.data);
                console.log(errorMessage);
                e.target.reset();
            }
        }
    }

    if(navigate) {
        return <Navigate to={"/login"}/>
    }

    const handleClose = () => {
        setErrorMessage('');
    }

    return <div className="container">
        <form onSubmit={submitRegistration} className="registration-container">
            <p>Sign in</p>
            <TextField margin="dense" required label={'First Name'} onChange={ e => setFirstname(e.target.value) } className="textfield" />
            <TextField margin="dense" required label={'Last Name'} onChange={ e => setLastName(e.target.value) } className="textfield"/>
            <TextField margin="dense" required label={'Username'} onChange={ e => setUsername(e.target.value) } className="textfield"/>
            <TextField margin="dense" required label={'Email'} onChange={ e => setEmail(e.target.value) } className="textfield"/>
            <TextField margin="dense" required label={'Password'} onChange={ e => setPassword(e.target.value) } className="textfield"/>
            <Button variant="contained" size="medium" type="submit">Submit</Button>
        </form>
        {errorMessage && <CustomSnackbar onClose={handleClose} open={true} message={errorMessage} />}
    </div>
}