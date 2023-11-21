import {Avatar, Typography} from "@mui/material";
// @ts-ignore
import React from "react";

export const MessageComponent : React.FC = ( ) => {


    function stringToColor(string: string) {
        let hash = 0;
        let i;

        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }

        return color;
    }

    function stringAvatar(name: string) {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }



    return (
        <div style={{display:"flex",flexDirection:"column" }}>
            <div style={{display:"flex",flexDirection:"row", margin:"5%" }}>
                <Avatar {...stringAvatar('Kent Dodds')}  />
                <Typography variant={"h6"}  style={{justifyContent:"center"}}>Message</Typography>
            </div>
            <small  style={{display:"flex",justifyContent:"end"}} >11/11/2001</small>
        </div>
    );





}