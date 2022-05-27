import React from "react";
import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import TokenService from "../services/TokenService";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import axiosInstance from "../interceptors/axios";
import CustomSnackbar from "./CustomSnackbar";
import {useState} from "react";

// We are going to render some elements of the navbar depending if the user is authenticated or not.
// For that we are going to check the state variable from the AuthContext.

export default function Navbar() {
    const { authenticate, removeAuthentication } = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState('');

    // We call our logout endpoint, so we can invalidate the refresh token.
    // We also remove all information from local storage and remove authentication from the authContext.
    const logout = async () => {
        try {
            await axiosInstance.post('logout/',{
                refresh_token: TokenService.getLocalRefreshToken(),
            });
            TokenService.removeTokenInfo();
            removeAuthentication();
        } catch (e) {
            setErrorMessage("We are sorry, something went wrong. Try again later.");
        }
    };

    const handleClose = () => {
        setErrorMessage('');
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        The Wall
                    </Typography>

                    <Link to="/">
                        <Button sx={{color: '#ffffff'}}>Home</Button>
                    </Link>

                    {!authenticate ? (
                        <>
                        <Link to="/login">
                            <Button sx={{color: '#ffffff'}}>Login</Button>
                        </Link>
                        <Link to="/register">
                        <Button sx={{color: '#ffffff'}}>Sign In</Button>
                        </Link>
                        </>
                        ) : (
                        <>
                            <Link to ="/profile">
                                <Button sx={{color: '#ffffff'}}>Profile</Button>
                            </Link>
                            <Link to ="/login">
                                <Button sx={{color: '#ffffff'}} onClick={logout}>Logout</Button>
                            </Link>
                        </>
                        )}
                </Toolbar>
            </AppBar>
            {errorMessage && <CustomSnackbar onClose={handleClose} open={true} message={errorMessage} />}
        </Box>
    );
}