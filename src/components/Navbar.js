import React, {useEffect, useState} from "react";
import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";
import {Link, Navigate} from "react-router-dom";
import TokenService from "../services/TokenService";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";

// We are going to render some elements of the navbar depending if the user is authenticated or not.
// For that we are going to check the state variable from the AuthContext.

export default function Navbar() {
    const { authenticate, removeAuthentication } = useContext(AuthContext);
    console.log("Value of is Authenticated from navbar component when render is: " + authenticate)

    // We call our logout endpoint.
    // We also remove all information from local storage and remove authentication from the authContext.
    const logout = async () => {
        try {
            const accessToken = TokenService.getLocalAccessToken();
            await axios.post('http://localhost:8000/logout/', {
                refresh_token: TokenService.getLocalRefreshToken(),
            }, {
                headers: {'Authorization': `Bearer ${accessToken}`}
            });
            TokenService.removeTokenInfo();
        } catch (err) {
            // If the log out endpoint returns an error is because the token expired, so I just delete them.
            TokenService.removeTokenInfo();
        } finally {
            // Update context because the user is no longer authenticated.
            removeAuthentication();
        }
    };

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
        </Box>
    );
}