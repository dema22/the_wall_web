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
    // error validators
    const [usernameErrValidator, setUsernameErrValidator] = useState('');
    const [emailErrValidator, setEmailErrValidator] = useState('');
    const [passErrValidator, setPassErrValidator] = useState('');

    const submitRegistration = async (e) => {
        e.preventDefault();
        try {
            if (!Boolean(usernameErrValidator) && !Boolean(usernameErrValidator) && !Boolean(usernameErrValidator)) {
                // Send request to the API to create a user
                await axios.post('http://localhost:8000/registration/', {
                    first_name, last_name, username, email, password
                });
                setNavigate(true);
            }
        } catch(err) {
            let errUsername = '', errEmail = '',  errPassword = '';
            if(err.response.data.username) {
                errUsername = err.response.data.username[0] + ' ';
            }
            if(err.response.data.email) {
                errEmail = err.response.data.email[0] + ' ' ;
            }
            if(err.response.data.password) {
                errPassword = err.response.data.password[0] + ' ' ;
            }
            setErrorMessage(errUsername + errEmail + errPassword)
            e.target.reset();
        }
    }

    if(navigate) {
        return <Navigate to={"/login"}/>
    }

    const handleClose = () => {
        setErrorMessage('');
    }

    const validateUsername = (e) => {
        console.log(e.target.value);
        const value = e.target.value.trim();
        setUsernameErrValidator('');
        setUsername(value);
        if(value.length < 8 || value.length > 50) {
            console.log("error de max y min en username");
            setUsernameErrValidator("Username must have at least 8 character and not more than 50.");
        }
    }

    const validateEmail = (e) => {
        console.log(e.target.value);
        const value = e.target.value.trim();
        setEmailErrValidator('');
        setEmail(value);
        if ( /\S+@\S+\.\S+/.test(value) === false){
            setEmailErrValidator("Invalid email format");
        }
    }

    const validatePassword = (e) => {
        console.log(e.target.value);
        const value = e.target.value;
        setPassErrValidator('');
        setPassword(value);
        if(value.length < 8) {
            console.log("error de min pass");
            setPassErrValidator("Password must have at least 8 character.");
        }
    }

    return <div className="container">
        <form onSubmit={submitRegistration} className="registration-container">
            <p>Sign in</p>
            <TextField margin="dense" required label={'First Name'} onChange={ e => setFirstname(e.target.value) } className="textfield" />
            <TextField margin="dense" required label={'Last Name'} onChange={ e => setLastName(e.target.value) } className="textfield"/>
            <TextField margin="dense" required label={'Username'} onChange={validateUsername} className="textfield" error={Boolean(usernameErrValidator)} helperText={(usernameErrValidator)}/>
            <TextField margin="dense" required label={'Email'} onChange={validateEmail} className="textfield" error={Boolean(emailErrValidator)} helperText={(emailErrValidator)}/>
            <TextField margin="dense" required label={'Password'} onChange={validatePassword} className="textfield"  error={Boolean(passErrValidator)} helperText={(passErrValidator)} type="password"/>
            <Button variant="contained" size="medium" type="submit">Submit</Button>
        </form>
        {errorMessage && <CustomSnackbar onClose={handleClose} open={true} message={errorMessage} />}
    </div>
}