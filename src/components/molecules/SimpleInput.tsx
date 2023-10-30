import { TextField } from "@mui/material";
import React = require("react");




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