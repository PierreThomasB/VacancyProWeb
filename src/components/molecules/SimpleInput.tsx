import { TextField } from "@mui/material";
import * as React from "react";




export const  SimpleInput = ({id,label}) => {


return (
<TextField
            required
            id={id}
            name={id}
            label={label}
            fullWidth
            variant="standard"
          />

);

}