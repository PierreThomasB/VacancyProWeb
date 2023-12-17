// @ts-ignore
import React, {useState} from "react";
import {Button, Dialog, ListItem, ListItemButton, ListItemText} from "@mui/material";
import {google, outlook, office365, yahoo, ics } from "calendar-link";
import {useNavigate} from "react-router-dom";
import Period from "../../models/Period";
import Activity from "../../models/Activity";




interface Event{
    title: string,
    description: string,
    start:Date,
    allDay: true,

}
export const CalendarSystem = ({activity }) => {
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


        let activityObj = activity as Activity
        console.log(activityObj);
        const event : Event = {title : activityObj.name ,description : activityObj.description , start : activityObj.beginDate  , allDay : true };
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