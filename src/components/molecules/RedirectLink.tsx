import {Link} from "react-router-dom";
// @ts-ignore
import React from "react";
export default function RedirectLink({message, handleMode, label}) {
    // @ts-ignore
    return (
        // @ts-ignore
        <p onClick={handleMode} style={{width: '100%', textAlign: 'center', margin: '1%'}}>
            {message}
            <Link className={'text-black w-full m-1 underline text-center transition-opacity duration-150 hover:opacity-50'} to={""}>{label}</Link>
        </p>
    )
}