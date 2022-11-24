import React from "react"
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import Avatar from '@mui/material/Avatar';
import { green, pink } from '@mui/material/colors';
import Stack from '@mui/material/Stack';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from "@mui/material";
import { logout } from "../services/auth.service";
import { useNavigate } from "react-router-dom";

export const TopBarComponent = () => {
    const navigate = useNavigate();

    function handleLogout(){
        logout()
        navigate("/admin")
    }
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Stack direction="row" spacing={2} justifyContent="space-between">
                        <Avatar sx={{ bgcolor: pink[500] }}>
                            <CalendarMonthOutlinedIcon />
                        </Avatar>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.1rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            TEAM SPACE APPLICATION
                        </Typography>
                        <Button onClick={handleLogout}>
                            <Avatar sx={{ bgcolor: pink[500] }}>
                                <LogoutIcon />
                            </Avatar>
                        </Button>
                    </Stack>
                </Toolbar>
            </Container>
        </AppBar>
    )
}