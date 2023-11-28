import {
    Autocomplete,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@mui/material";
// @ts-ignore
import React, {useEffect, useState} from "react";
export const DialogInput = ({buttonValue,titre,suggests,actionsWhenOpen }) => {

    const [open, setOpen] = useState(false);
    const [suggestions,setSuggestion] = useState([]);
    const [selectedItem , setSelectedItem ] = useState();




    useEffect(() => {
        if(suggests !== null){
            setSuggestion(suggests);
        }
    }, [suggests]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickConfirmed = async () => {
        if(selectedItem !== undefined) {
            await actionsWhenOpen(selectedItem);
            setOpen(false);
        }
    }

    const handleNewItemChoosed = (e , newValue)=> {
        setSelectedItem(newValue.id);

    }



    return (
        <div>
            <Button onClick={() => handleClickOpen()} placeholder={buttonValue}>{buttonValue}</Button>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle>{titre}</DialogTitle>
                <DialogContent>
                    <Autocomplete
                        value={selectedItem}
                        onChange={handleNewItemChoosed}
                        id={"peopleAutocomplete"}
                        clearOnEscape
                        renderInput={(params) => {

                            return (<TextField  {...params} label="Nom d'utilisateur" />)}}
                            options={suggestions}
                        getOptionLabel={(option) => option.label}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Annuler</Button>
                    <Button onClick={handleClickConfirmed}>Enregistrer</Button>
                </DialogActions>
            </Dialog>
        </div>
    );

}