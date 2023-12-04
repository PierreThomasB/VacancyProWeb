import {Button} from "@mui/material";
// @ts-ignore
import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';

export const NotificationComponent = ({nom , id}) => {


    function deleteNotification(id:number ) {

    }

    return (

        <div id={id} style={{backgroundColor:"white",minWidth:"100%" , minHeight:"50%" , display:"flex" , flexDirection:"row"}} >
            <p className={"c"}>{nom}</p>
            <Button  onClick={(e) => {deleteNotification(e.clientX)}} />
            <DeleteIcon/>
            <hr/>
        </div>
    );
}