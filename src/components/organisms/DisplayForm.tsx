import {Box} from "@mui/material";
import * as React from "react";

export default function DisplayForm({handleSubmit, inputs}) {
    return (
        <Box component="form" onSubmit={handleSubmit} noValidate /*className={'form-auth'}*/ className={'flex flex-row flex-wrap w-[80%] justify-center '} sx={{mt:1}}>
            {inputs.map((input: any) => input)}
        </Box>
    )
}