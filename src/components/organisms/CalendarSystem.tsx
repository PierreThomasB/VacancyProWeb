// @ts-ignore
import React, {useState} from "react";
import {Button, Dialog, ListItem, ListItemButton, ListItemText} from "@mui/material";
import { google, outlook, office365, yahoo, ics } from "calendar-link";
import {useNavigate} from "react-router-dom";




interface Event{
    title: string,
    description: string,
    start:Date,
    duration: [1, "day"],



}
export const CalendarSystem = ({period}) => {
    const [open,setOpen] = useState(false);
    const navigate = useNavigate();
    const [urls ,setUrls] = useState([]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handlebuttonClick = (value: any)  => {
        window.location.href = value;
    }










    function handleAddcalendar() {


        const event : Event = {title : period.name ,description : period.description , start : period.beginDate , duration : [1, "day"]};
        let tempTab = []
        tempTab.push([google(event) , "Export to Google"]);
        tempTab.push([outlook(event) , "Export to Outlook"]);
        tempTab.push([office365(event) , "Export to office"]);
        tempTab.push([yahoo(event) , "Export to Yahoo"]);
        tempTab.push([ics(event), "Export With Ics"]);
        setUrls(tempTab);
        setOpen(true);


    }




    return (
        <div>
            <Button onClick={handleAddcalendar}>Add to calendar</Button>
            <Dialog open={open} onClose={handleClose}>
                <ListItem disableGutters key={"key"} style={{display:"flex",flexDirection:"column"}}>
                    {urls.map((url) => (
                         <ListItemButton  onClick={() => handlebuttonClick(url[0])}>

                             <ListItemText primary={url[1]} />



                         </ListItemButton>

                    ))}



                </ListItem>

            </Dialog>

        </div>


    );



}