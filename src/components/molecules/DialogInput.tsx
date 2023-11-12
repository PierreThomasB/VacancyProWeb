import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
// @ts-ignore
import React, {useState} from "react";


export const DialogInput = ({buttonValue , titre,contenu,champs}) => {

    const [open, setOpen] = useState(false);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };




    return (
        <div>
            <Button onClick={() => handleClickOpen()} placeholder={buttonValue}>{buttonValue}</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{titre}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {contenu}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label={champs}
                        type="input"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Annuler</Button>
                    <Button onClick={handleClose}>Enregistrer</Button>
                </DialogActions>
            </Dialog>
        </div>
    );

}