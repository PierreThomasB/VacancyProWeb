import {Box} from "@mui/material";
import React from "react";

export default function ({handleSubmit, inputs}) {
    return (
        <Box component="form" onSubmit={handleSubmit} noValidate /*className={'form-auth'}*/ className={'flex flex-row flex-wrap w-[80%] justify-center items-center'} sx={{mt:1}}>
            {inputs.map((input: any) => input)}
        </Box>
    )
}