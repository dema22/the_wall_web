import React, {useEffect, useState} from "react";
import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";
import {Link, Navigate} from "react-router-dom";
import TokenService from "../services/TokenService";
import axios from "axios";

export default function Navbar() {
    const [userId, setUserId] = useState(TokenService.getUserId());
    console.log(TokenService.getUserId());

    const logout = async () => {
        try {
            console.log("Calling log out endpoint");
            const accessToken = TokenService.getLocalAccessToken();
            await axios.post('http://localhost:8000/logout/', {
                refresh_token: TokenService.getLocalRefreshToken(),
            }, {
                headers: {'Authorization': `Bearer ${accessToken}`}
            });
            TokenService.removeTokenInfo();
        } catch (err) {
            // If the log out endpoint returns an error is because the token expired, so I just delete them
            TokenService.removeTokenInfo();
        }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        The Wall
                    </Typography>

                    {!userId ? (
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