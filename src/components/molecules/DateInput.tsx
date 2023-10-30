import { LocalizationProvider, StaticDatePicker} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import 'dayjs/locale/en-gb';
import * as React from "react";



export const DateInput = () => {
    return(
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>






                <StaticDatePicker></StaticDatePicker>

            </LocalizationProvider>


        </div>
    )



}