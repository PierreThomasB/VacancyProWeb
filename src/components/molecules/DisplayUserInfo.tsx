import {MenuItem} from "@mui/material";
import * as React from "react";
import {Link} from "react-router-dom";

export default function DisplayUserInfo({onClick, route, label, onReset}) {
    if (onClick) {
        return (
            <MenuItem onClick={onClick} sx={{justifyContent: 'flex-end'}}>
                <p onClick={onReset}>{label}</p>
            </MenuItem>
        )
    }

    if (route) {
        return (
            <Link to={route}>
                <MenuItem sx={{justifyContent: 'flex-end'}}>
                    <p onClick={onReset}>{label}</p>
                </MenuItem>
            </Link>
        )
    }
}
