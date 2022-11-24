import * as React from 'react';
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
import { updateUserRoles } from '../services/user.service';

export default function ChangePermissionsComponent(props) {
    const { onClose, selectedValue, openPopup, username } = props;
  
    const handleClosePopup = () => {
      onClose(selectedValue);
    };
  
    const handleListItemClick = (value) => {
      onClose(value);
    };


    const [state, setState] = React.useState({
        read: true,
        edit: false,
        suppress: false,
      });
    console.log(props)
    const handleChange = (event) => {
    setState({
        ...state,
        [event.target.name]: event.target.checked,
        });
    };
    const { read, edit, suppress } = state;
    const error = [read, edit, suppress].filter((v) => v).length === 0;

    const handlePermissionsUpdate = () => {
      var newPermissions = []
      if (read === true) {
        newPermissions.push({
          "roleName": "UserRead",
          "roleDescription": "Read Role for User"
        })
      }
      if (edit === true){
        newPermissions.push({
          "roleName": "UserEdit",
          "roleDescription": "Edit Role for User"
        })
      }
      if (suppress === true){
        newPermissions.push({
          "roleName": "UserDelete",
          "roleDescription": "Delete Role for User"
        })
      }
      updateUserRoles(username, newPermissions)
      handleClosePopup()
    }
    
    return (
      <Dialog onClose={handleClosePopup} open={openPopup}>
        <DialogTitle>Edit Permissions</DialogTitle>
        <Container>
            <FormControl
                required
                error={error}
                component="fieldset"
                sx={{ width: "50%" }}
                variant="standard"
            >
                <FormLabel component="legend">*</FormLabel>
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
        </Container> 
        {/* onClick={handleClick} */}
        <Button variant="contained" sx={{mt: 2}} fullWidth onClick={handlePermissionsUpdate}>Confirm</Button>
      </Dialog>
    );
  }
  
  ChangePermissionsComponent.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
  };   
