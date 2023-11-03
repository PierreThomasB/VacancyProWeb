import { TextField } from "@mui/material";
import * as React from "react";
import {useState} from "react";




export const  SimpleInput = ({id,label , onInputChange}) => {

    const message = document.getElementById(id+'message');


    const check = (input) => {
        const word = input.target.value;
        if (word.length < 3) {
            message.textContent = 'Le nom doit contenir au moins 3 caractères.';
        } else {
            message.textContent = '';
            onInputChange(word);
        }
    }



    // @ts-ignore
    return (
        <div>
            <TextField
                        onChange={(newValue) => {
                            check(newValue);
                        }}
                        required
                        id={id}
                        name={id}
                        label={label}
                        fullWidth
                        variant="standard"
                      />
                <span id={id+"message"} style={{color:"red"}}></span>
        </div>


);

}