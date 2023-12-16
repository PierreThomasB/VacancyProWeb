import {Avatar, Typography} from "@mui/material";
// @ts-ignore
import React, {useState} from "react";
import Message from "../../models/Message.ts";

export const MessageComponent = ({message} ) => {




    const [messageComp, setMessageComp] = useState<Message>(message as Message);



    const getDate = ():string   =>  {
        let dateComp : Date = new Date(messageComp.date);
        let month : number =dateComp.getMonth()+1
        return dateComp.getDate()+"/"+month+"/"+dateComp.getFullYear();
    }

    function stringAvatar(name: string) {
        return {
            sx: {
                bgcolor: messageComp.stringToColor(),
            },
            //date.getDate()+"/"+date.getMonth()+"/"+date.getYear()
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }



    return (
        <div style={{display:"flex",flexDirection:"column" }}>
            <div style={{display:"flex",flexDirection:"row" }}>
                <Avatar {...stringAvatar(messageComp.user.username)}  />
                <p>{messageComp.message}</p>
            </div>
            <small>{getDate()}</small>
        </div>
    );





}