import { TextField } from "@mui/material";
import * as React from "react";
import {useState} from "react";




export const  SimpleInput = ({id,label , onInputChange , value }) => {


    const [errorMessage, setErrorMessage] = useState("");



    const check = (input) => {

        const word = input.target.value;
        if (word.length < 3) {
            setErrorMessage("Le "+label+" doit contenir au moins 3 caractères ");
        } else {
            setErrorMessage("");
        }
        onInputChange(word);
    }



    // @ts-ignore
    return (
        <div>
            <TextField
                        onChange={(event) => {
                            check(event);
                        }}
                        required
                        id={id}
                        name={id}
                        label={label}
                        fullWidth
                        variant="standard"
                        value={value}

                      />
                <span id={id+"message"} style={{color:"red"}}>{errorMessage}</span>
        </div>


);

}