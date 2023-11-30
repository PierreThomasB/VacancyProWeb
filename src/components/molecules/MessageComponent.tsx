import {Avatar, Typography} from "@mui/material";
// @ts-ignore
import React from "react";

export const MessageComponent = ({message , date , username} ) => {


    function stringToColor(user: string) {
        let hash = 0;
        let i;
        console.log(user);


        for (i = 0; i < user.length; i += 1) {
            hash = user.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }

        return color;
    }


    const getDate = ():string   =>  {
        const dateComp = new Date(date);
        let month : number =dateComp.getMonth()+1
        return dateComp.getDate()+"/"+month+"/"+dateComp.getFullYear();
    }

    function stringAvatar(name: string) {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            //date.getDate()+"/"+date.getMonth()+"/"+date.getYear()
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }



    return (
        <div style={{display:"flex",flexDirection:"column" }}>
            <div style={{display:"flex",flexDirection:"row" }}>
                <Avatar {...stringAvatar(username)}  />
                <p>{message}</p>
            </div>
            <small>{getDate()}</small>
        </div>
    );





}