import * as React from 'react';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
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
import ChangePermissionsComponent from './ChangePermissionsComponent';
import UpdateUserPopupComponent from './UpdateUserPopupComponent';
import { deleteUser } from '../services/user.service';

const emails = ['username@gmail.com', 'user02@gmail.com'];

export default function ActionsComponent({ username }) {
  const [openToggle, setOpenToggle] = React.useState(false);
  const anchorRef = React.useRef(null);

  const [openPopupPermission, setOpenPopupPermission] = React.useState(false);
  const [openPopupUpdate, setOpenPopupUpdate] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);
  
  const handleClickOpenPopupPermission = () => {
    setOpenPopupPermission(true);
  };
  const handleClickOpenPopupUpdate = () => {
    setOpenPopupUpdate(true);
  };

  const handleClosePopupPermission = (value) => {
        setOpenPopupPermission(false);
        setSelectedValue(value);
  };
  const handleClosePopupUpdate = (value) => {
    setOpenPopupUpdate(false);
    setSelectedValue(value);
};
  const handleRemove = (event, username) => {
    deleteUser(username)
    handleCloseToggle(event)
  }

  const handleToggle = () => {
    setOpenToggle((prevOpen) => !prevOpen);
  };

  const handleCloseToggle = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpenToggle(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpenToggle(false);
    } else if (event.key === 'Escape') {
      setOpenToggle(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(openToggle);
  React.useEffect(() => {
    if (prevOpen.current === true && openToggle === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = openToggle;
  }, [openToggle]);

  return (
    <Stack direction="row" spacing={2}>
      <div>
        <Button
          ref={anchorRef}
          id="composition-button"
          aria-controls={openToggle ? 'composition-menu' : undefined}
          aria-expanded={openToggle ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          Actions
        </Button>
        <Popper
          open={openToggle}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          Portal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseToggle}>
                  <MenuList
                    autoFocusItem={openToggle}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem onClick={(event) => {handleClickOpenPopupPermission(); handleCloseToggle(event); }}>Change Permissions</MenuItem>
                    <MenuItem onClick={(event) => {handleClickOpenPopupUpdate(); handleCloseToggle(event); }}>Update</MenuItem>
                    <MenuItem onClick={handleCloseToggle}>Impersionate</MenuItem>
                    <MenuItem onClick={handleCloseToggle}>Block</MenuItem>
                    <MenuItem onClick={(event) => handleRemove(event, username)}>Delete</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        <ChangePermissionsComponent
            selectedValue={selectedValue}
            openPopup={openPopupPermission}
            onClose={handleClosePopupPermission}
            username={username}
        />

        <UpdateUserPopupComponent
            selectedValue={selectedValue}
            openPopup={openPopupUpdate}
            onClose={handleClosePopupUpdate}
            oldUsername={username}
        />
        
      </div>
    </Stack>
  );
}