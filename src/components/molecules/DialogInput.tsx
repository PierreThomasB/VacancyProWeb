import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
// @ts-ignore
import React, {useState} from "react";
import {wait} from "@testing-library/user-event/dist/utils";


export const DialogInput = ({buttonValue , titre,contenu,champs , actions }) => {

    const [open, setOpen] = useState(false);
    const [inputStr,setInput] = useState('');


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = () => {
        let result = actions(inputStr);
         console.log(result);
    }




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
                        onChange={handleInputChange}
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