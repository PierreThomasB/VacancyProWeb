// @ts-ignore
import React from "react";
import {observer} from "mobx-react";
import {ObservedNavBar} from "../templates/NavBar.tsx";
import {ObservedSignIn} from "../templates/SignIn.tsx";
import {authentificationStore} from "../../stores/AuthentificationStore.ts";
import {ObservedSnackBar} from "../molecules/SnackBar.tsx";
import {ObservedSignUp} from "../templates/SignUp.tsx";
import {FormEvent, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {sessionStore} from "../../stores/SessionStore.ts";


function Authentication() {
    const routes = require('../../routes.json')
    const navigate = useNavigate()

    useEffect(() => {
        if (sessionStore.user) navigate(routes.Home)
        authentificationStore.onModeChange('signin')
    }, [sessionStore.user])

    const handleSubmit = (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let data = new FormData(event.currentTarget)
        authentificationStore.handleSubmit([...data.values()])
    }
    if (authentificationStore.mode === 'signin') {

        return (
            <div>
                <ObservedNavBar/>
                <ObservedSignIn handleSubmit={handleSubmit}/>
                <ObservedSnackBar open={authentificationStore.open} message={authentificationStore.errorMsg} severity={authentificationStore.severity}/>
            </div>
        )
    }

    if (authentificationStore.mode === 'signup') {
        return (
            <div>
                <ObservedNavBar/>
                <ObservedSignUp handleSubmit={handleSubmit}/>
                <ObservedSnackBar open={authentificationStore.open} message={authentificationStore.errorMsg} severity={authentificationStore.severity}/>
            </div>
        )
    }

}

export const ObservedAuthentication = observer(Authentication);