// @ts-ignore
import React from "react";
import {Box} from "@mui/material";

export default function Column({content}) {
    return (
        <Box className={'flex w-1/2 justify-center flex-row flex-wrap'}>
            {content.map((content: any) => content)}
        </Box>
    )

}