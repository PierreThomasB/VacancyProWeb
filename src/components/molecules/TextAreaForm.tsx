import {TextareaAutosize, TextField} from "@mui/material";
import * as React from "react";

export default function TextAreaForm({id, label}) {
    return (
        <TextField
            required
            type={id}
            id={id}
            label={label}
            name={id}
            autoComplete={id}
            className={'w-[86%] h-[56px] bg-white'}
            multiline={true}
            rows={3}
            autoFocus
        />
    )
}