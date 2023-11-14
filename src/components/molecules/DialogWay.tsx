import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
// @ts-ignore
import React, {useState} from "react";

export const DialogWay = ({buttonValue , titre,lieux}) => {

    const [open, setOpen] = useState(false);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };



    return(
        <div>
            <Button onClick={() => handleClickOpen()} placeholder={buttonValue}>{buttonValue}</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{titre}</DialogTitle>
                <DialogContent>
                    <iframe
                        width={"500"}
                        height={"400"}
                        style={{border:0}}
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy={"no-referrer-when-downgrade"}
                        src={"https://www.google.com/maps/embed/v1/place?key=AIzaSyAeX0rGP22Zfco3WbT44TFHbKxqmPmIK_s&q="+lieux}
                    >
                    </iframe>




                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Fermer</Button>
                </DialogActions>
            </Dialog>
        </div>







    )

}