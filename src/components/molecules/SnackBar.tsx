import {Alert, Snackbar} from "@mui/material";
import {observer} from "mobx-react";
import * as React from "react";

function SnackBar({open,message,severity}) {
    return (
        <Snackbar open={open}
                  autoHideDuration={1000}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
            <Alert severity={severity} className='w-full justify-center'>
                {message}
            </Alert>
        </Snackbar>
    )
}
export const ObservedSnackBar = observer(SnackBar)