import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
// @ts-ignore
import React, {useState} from "react";


export const DialogConfirmation = ({buttonValue , titre, actions}) => {

    const [open, setOpen] = useState(false);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };




    return (
        <div>
            <Button onClick={() => handleClickOpen()} >{buttonValue}</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{titre}</DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>Annuler</Button>
                    <Button onClick={() => {
                        actions()
                        handleClose()
                    }
                        }>Valider</Button>
                </DialogActions>
            </Dialog>
        </div>
    );

}