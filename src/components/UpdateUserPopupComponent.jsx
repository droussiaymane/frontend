import React, { useEffect, useState } from "react"
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import PropTypes from 'prop-types';
import { Container } from '@mui/system';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { updateUser } from '../services/user.service';
import { getUserRolesByUsername } from '../services/user.service';

export default function UpdateUserPopupComponent(props) {
    const { onClose, selectedValue, openPopup, oldUsername } = props;
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [address, setAddress] = useState("")
    const [userRoles, setUserRoles] = useState()
    const handleClosePopup = () => {
      onClose(selectedValue);
    };

    useEffect(()=>{
        getUserRolesByUsername(oldUsername).then(function(data){setUserRoles(data)})
    },[])

    useEffect(()=>{
        console.log(userRoles)
    }, [userRoles])

    const handleUpdate = () => {
        var userPermissions = []
        for (var i=0; i<userRoles.length; i++){
            userPermissions.push(userRoles[i].roleName)
        }
        const newUserData = {
            "userName": username,
            "email": email,
            "address": address,
            "userPassword": password,
            "rolesName": userPermissions
        }
        updateUser(oldUsername, newUserData)
        handleClosePopup()
    }
    
    return (
      <Dialog onClose={handleClosePopup} open={openPopup}>
        <DialogTitle>Update User Details</DialogTitle>
        <Container>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: "80%"
            }}>
                <Box component="form" noValidate sx={{mt: 1}}>
                    <TextField  size="small" onChange={(e) => setUsername(e.target.value)} id="outlined-basic" label="Username" variant="outlined" fullWidth margin="normal"/>
                    <TextField  size="small" onChange={(e) => setEmail(e.target.value)} id="outlined-basic" label="Email" variant="outlined" fullWidth margin="normal"/>
                    <TextField  size="small" onChange={(e) => setAddress(e.target.value)} id="outlined-basic" label="Address" variant="outlined" fullWidth margin="normal"/>
                    
                    <TextField type="password" size="small" onChange={(e) => setPassword(e.target.value)} id="outlined-basic" label="Password" variant="outlined" fullWidth margin="normal"/>
                    {/* <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" /> */}
                </Box>

            </Box>

        </Container> 
        {/* onClick={handleClick} */}
        <Button variant="contained" onClick={handleUpdate} sx={{mt: 2}} fullWidth >Confirm</Button>
      </Dialog>
    );
  }
  
  UpdateUserPopupComponent.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
  };   
