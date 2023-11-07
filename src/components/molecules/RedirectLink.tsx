import {Link} from "react-router-dom";
import * as React from "react";
export default function RedirectLink({message, handleMode, label}) {
    return (
        <p onClick={handleMode} style={{width: '100%', textAlign: 'center', margin: '1%'}}>
            {message}
            <Link className={'redirect-auth'}>{label}</Link>
        </p>
    )
}