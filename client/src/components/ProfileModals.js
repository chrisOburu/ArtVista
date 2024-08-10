import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import './Project.css'

export default function ProfileModals() {
  const [openDialog, setOpenDialog] = useState(null);

  const handleClickOpen = (dialogName) => {
    setOpenDialog(dialogName);
  };

  const handleClose = () => {
    setOpenDialog(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
    handleClose();
  };

  return (
    <div className="button-container">
      <Button variant="text" onClick={() => handleClickOpen('email')}>
        Update Email Address?
      </Button>
      <Dialog
        open={openDialog === 'email'}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Update Email Address</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="new-email"
            name="email"
            label="New Email Address"
            type="email"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Save Changes</Button>
        </DialogActions>
      </Dialog>

      <Button variant="text" onClick={() => handleClickOpen('password')}>
        Change Password?
      </Button>
      <Dialog
        open={openDialog === 'password'}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="current-password"
            name="current-password"
            label="Current Password"
            type="password"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            id="new-password"
            name="new-password"
            label="New Password"
            type="password"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            id="confirm-password"
            name="confirm-password"
            label="Confirm Password"
            type="password"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Save Changes</Button>
        </DialogActions>
      </Dialog>

      <Button variant="text" onClick={() => handleClickOpen('username')}>
        Update Username?
      </Button>
      <Dialog
        open={openDialog === 'username'}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Update Username</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="new-username"
            name="username"
            label="New Username"
            type="text"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Save Changes</Button>
        </DialogActions>
      </Dialog>

      <Button variant="text" onClick={() => handleClickOpen('profile-picture')}>
        Update Profile Picture?
      </Button>
      <Dialog
        open={openDialog === 'profile-picture'}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Update Profile Picture</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="profile-picture"
            name="profile-picture"
            label="Profile Picture URL"
            type="text"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Save Changes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
