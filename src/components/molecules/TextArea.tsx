import {TextField} from "@mui/material";
// @ts-ignore
import React from "react";

export const TextArea = ({id,label,onTextAreaChanged}) => {

    const message = document.getElementById(id+'message');


    const check = (input) => {
        const word = input.target.value;
        if (word.length < 3) {
            message.textContent = 'Le nom doit contenir au moins 3 caractères.';
        } else {
            message.textContent = '';
            onTextAreaChanged(word);
        }
    }




    return (



        <div>
            <TextField multiline={true} onChange={(newValue)=> check(newValue)} id={id} label={label} variant={"standard"} minRows={10} style={{minWidth:"100%"}}  />
            <span id={id+"message"} style={{color:"red"}}></span>
        </div>

    );
}