import {Box} from "@mui/material";
import React from "react";

export default function ({handleSubmit, inputs}) {
    return (
        <Box component="form" onSubmit={handleSubmit} noValidate className={'form-auth'} sx={{mt:1}}>
            {inputs.map((input: any) => input)}
        </Box>
    )
}