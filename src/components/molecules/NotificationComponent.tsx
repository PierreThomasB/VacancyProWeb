import {Button} from "@mui/material";
// @ts-ignore
import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import {canDeleteNotifications} from "../../stores/NotificationStore.ts";

export const NotificationComponent = ({nom , id}) => {


    function deleteNotification() {
        canDeleteNotifications.handleDeleteNotification(id).then(
            () => {
                window.location.reload();
            }
        )

    }

    return (

        <div id={id} style={{backgroundColor:"white",minWidth:"100%" , minHeight:"50%" , display:"flex" , flexDirection:"row"}} >
            <p className={"c"}>{nom}</p>
            <Button  onClick={deleteNotification} />
            <DeleteIcon/>
            <hr/>
        </div>
    );
}