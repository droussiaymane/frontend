import React, { useState } from "react"
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { green, pink } from '@mui/material/colors';
import Box from '@mui/material/Box';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

import AuthService from "../services/auth.service";

export default function SignInComponent({globalRole}) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    async function loginUser(){
        const res = await fetch('http://localhost:9090/authenticate', {
            method: 'POST',
            // credentials: 'include', // Don't forget to specify this if you need cookies
            body: JSON.stringify({
                "userName": username,
                "userPassword": password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        
        const data = await res.json();
        if (data.error){
            console.log(data.error); 
        }
        if (data.jwtToken){
            const roles = jwt_decode(data['jwtToken'])["role"]
            if (globalRole === "Admin"){
                if (roles.length === 1 && roles[0].authority === "ROLE_Admin"){
                    console.log('Logged as Admin');
                    localStorage.setItem("token", data['jwtToken']);
                    navigate("/AdminDashboard");
                } else {
                    console.log("Wrong creds!")
                }
            } else if (globalRole === "User"){
                const isUser = true;
                for (var i = 0; i < roles.length; i++){
                    if (roles[i].authority === "ROLE_Admin"){
                        isUser = false;
                    }
                }
                if (isUser === true){
                    console.log('Logged as User');
                    localStorage.setItem("token", data['jwtToken']);
                    navigate("/UserDashboard");
                    
                } else {
                    console.log("Wrong creds!")
                }
            }
        } else {
            console.log("Wrong creds!")
        }
      }
    
    return (
        <Container>
            <Box sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <Avatar sx={{ bgcolor: pink[500] }}>
                    <LoginOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign In {globalRole} 
                </Typography>
                <Box component="form" noValidate sx={{mt: 1}}>
                    <TextField onChange={(e) => setUsername(e.target.value)} id="outlined-basic" label="Username" variant="outlined" fullWidth margin="normal"/>
                    <TextField type="password" onChange={(e) => setPassword(e.target.value)} id="outlined-basic" label="Password" variant="outlined" fullWidth margin="normal"/>
                    {/* <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" /> */}
                    <Button variant="contained" sx={{mt: 2}} fullWidth onClick={loginUser} >Sign In</Button>
                </Box>

            </Box>

        </Container>
        
    )
}