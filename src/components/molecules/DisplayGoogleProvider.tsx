// @ts-ignore
import React, {useEffect} from "react";
import {GoogleLogin} from "@react-oauth/google";
import {gapi} from "gapi-script";
export default function DisplayGoogleProvider({clientId, onSuccess, onError}) {
    useEffect(() => {
        const initClient = () => {
            gapi.auth2.init({
                clientId: clientId,
                scope: ''
            })
        }
        gapi.load('client:auth2', initClient)
    })
    return (
        <GoogleLogin onSuccess={onSuccess} onError={onError}/>
        /*<GoogleLogin
            onSuccess={credentialResponse => {
                console.log(credentialResponse);
            }}
            onError={() => {
                console.log('Login Failed');
            }}
        />*/
    )
}