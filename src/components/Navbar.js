import React, {useEffect, useState} from "react";
import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import TokenService from "../services/TokenService";

export default function Navbar() {
    const [userId, setUserId] = useState(TokenService.getUserId);
    console.log(userId);
    useEffect(() => {
        window.addEventListener('storage', () => {
            const item = JSON.parse(localStorage.getItem('userId'))
            if(item) {
                setUserId(item)
            }
        })
    },[])

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
                            <Button sx={{color: '#ffffff'}}>LogOut</Button>
                            </Link>
                        </>
                        )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}