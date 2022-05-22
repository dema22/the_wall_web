import React from "react";
import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";
import {Link} from "react-router-dom";

export default function Navbar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        The Wall
                    </Typography>
                    <Link to="/login">
                        <Button sx={{ color: '#ffffff'}}>Login</Button>
                    </Link>
                    <Link to="/register">
                        <Button sx={{ color: '#ffffff'}}>Sign In</Button>
                    </Link>
                </Toolbar>
            </AppBar>
        </Box>
    );
}