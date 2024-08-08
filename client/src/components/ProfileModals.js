import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function ProfileModals() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="text" onClick={handleClickOpen}>
      Update Email Address
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Update Email Address</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="new-Email"
            name="new-Email"
            label="New Email Address"
            type="email"
            fullWidth
            variant='outlined'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Save Changes</Button>
        </DialogActions>
      </Dialog>

      <Button variant="text" onClick={handleClickOpen}>
      Change Password
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="previous-password"
            name="previous-password"
            label="Current Password"
            type="password"
            fullWidth
            variant='outlined'
          />
          <TextField
            autoFocus
            margin="dense"
            id="new-password"
            name="new-password"
            label="New Password"
            type="password"
            fullWidth
            variant='outlined'
          />
           <TextField
            autoFocus
            margin="dense"
            id="confirm-password"
            name="confirm-password"
            label="Confirm Password"
            type="password"
            fullWidth
            variant='outlined'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Save Changes</Button>
        </DialogActions>
      </Dialog>
         </>
  );
}