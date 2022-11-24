import React, { useEffect, useState } from "react"
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { createUser } from '../services/user.service';

const emails = ['username@gmail.com', 'user02@gmail.com'];

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [address, setAddress] = useState("")

  const [state, setState] = React.useState({
    read: true,
    edit: false,
    suppress: false,
  });
  
  const handleClick = () => {
    const roles = []
    if (read === true){
        roles.push("UserRead")
    }
    if (edit === true){
        roles.push("UserEdit")
    }
    if (suppress === true){
        roles.push("UserDelete")
    }

    const userData = {
        "userName": username,
        "email": email,
        "address": address,
        "userPassword": password,
        "rolesName": roles
    }
 

    createUser(userData)
    handleClose()
  }
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };
  const { read, edit, suppress } = state;
  const error = [read, edit, suppress].filter((v) => v).length === 0;

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Create New User</DialogTitle>
      <Box sx={{ display: 'flex' }}>


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
                    
                    <TextField  type="password" size="small" onChange={(e) => setPassword(e.target.value)} id="outlined-basic" label="Password" variant="outlined" fullWidth margin="normal"/>
                    {/* <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" /> */}
                </Box>

            </Box>

        </Container>

        <FormControl
            required
            error={error}
            component="fieldset"
            sx={{ width: "50%" }}
            variant="standard"
        >
            <FormLabel component="legend">Permissions</FormLabel>
            <FormGroup>
            <FormControlLabel
                control={
                <Checkbox checked={read} onChange={handleChange} name="read" />
                }
                label="Read"
            />
            <FormControlLabel
                control={
                <Checkbox checked={edit} onChange={handleChange} name="edit" />
                }
                label="Edit"
            />
            <FormControlLabel
                control={
                <Checkbox checked={suppress} onChange={handleChange} name="suppress" />
                }
                label="Delete"
            />
            </FormGroup>
        </FormControl>
      </Box>
      <Button variant="contained" sx={{mt: 2}} fullWidth onClick={handleClick}>Create New User</Button>

    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function AddUserComponent() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Create New User
      </Button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}