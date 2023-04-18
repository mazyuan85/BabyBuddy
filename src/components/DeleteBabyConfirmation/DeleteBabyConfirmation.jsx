import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

const DeleteBabyConfirmation = ({babyName, handleDelete}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = (event) => {
    handleDelete(event);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleClickOpen} variant="outlined" endIcon={<PersonRemoveIcon/>} color="primary" sx={{marginTop:3}}>Delete</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete {babyName}</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete {babyName}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteBabyConfirmation;