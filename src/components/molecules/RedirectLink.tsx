import {Link} from "react-router-dom";
// @ts-ignore
import React from "react";
export default function RedirectLink({message, handleMode, label}) {
    // @ts-ignore
    return (
        // @ts-ignore
        <p onClick={handleMode} style={{width: '100%', textAlign: 'center', margin: '1%'}}>
            {message}
            <Link className={'redirect-auth'} to={""}>{label}</Link>

        </p>
    )
}