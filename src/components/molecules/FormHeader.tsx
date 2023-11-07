import * as React from "react";
import {Box} from "@mui/material";
export default function ({inputs}) {
    return (
        <Box component={"div"} className={'flex justify-center items-center flex-col w-full'}>
            {inputs.map((input: any) => input)}
        </Box>
    )
}