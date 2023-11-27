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
import {periodStore} from "../../stores/PeriodStore.ts";
import {api} from "../../repositories/Api.ts";


export const DialogInput = ({buttonValue , titre,contenu,actions }) => {

    const [open, setOpen] = useState(false);
    const [suggestions,setSuggestion] = useState([]);




    useEffect(() => {

        const initUsers  = async () => {
            let res =  periodStore.handleGetAllUser();
            return res;
        }

       initUsers().then(re => setSuggestion(re));
    }, [actions]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        api.addUserToPeriod("",1)

        setOpen(false);
    };






    return (
        <div>
            <Button onClick={() => handleClickOpen()} placeholder={buttonValue}>{buttonValue}</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{titre}</DialogTitle>
                <DialogContent>
                    <Autocomplete
                        id={"peopleAutocomplete"}
                        disablePortal
                        renderInput={(params) => <TextField {...params} label="Nom d'utilisateur" />}
                        options={suggestions}
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