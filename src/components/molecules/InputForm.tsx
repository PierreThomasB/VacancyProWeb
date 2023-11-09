import {TextField} from "@mui/material";
import * as React from "react";

export default function InputForm({id, label, disabled, value}) {
    return (
        <TextField
            sx={{margin: '1%', marginBottom: "-1%"}}
            required
            type={id}
            value={value}
            id={id}
            disabled={disabled}
            label={label}
            name={id}
            autoComplete={id}
            className={'w-[86%] h-[56px] m-[100px] bg-white'}
            autoFocus
        />
    )
}