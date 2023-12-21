import {TextField} from "@mui/material";
// @ts-ignore
import React, {useState} from "react";

export const TextArea = ({id,label,onTextAreaChanged ,value}) => {


    const [errorMessage, setErrorMessage] = useState("");




    const check = (input) => {
        const word = input.target.value;
        if (word.length < 3) {
            setErrorMessage( 'Le nom doit contenir au moins 3 caractères.');
        } else {
            setErrorMessage("");
            onTextAreaChanged(word);
        }
    }




    return (



        <div>
            <TextField multiline={true} value={value} onChange={(newValue)=> check(newValue)} id={id} label={label} variant={"standard"} minRows={10} style={{minWidth:"100%"}}  />
            <span id={id+"message"} style={{color:"red"}}>{errorMessage}</span>
        </div>

    );
}