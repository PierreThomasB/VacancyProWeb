// @ts-ignore
import React from "react";
import {observer} from "mobx-react";
import {ObservedNavBar} from "../templates/NavBar.tsx";
import {ObservedSignIn} from "../templates/SignIn.tsx";
import {authentificationStore} from "../../stores/AuthentificationStore.ts";


function Authentication() {
    const handleSubmit = (event) => {

    }
    if (authentificationStore.mode === 'signin') {

        return (
            <div>
                <ObservedNavBar/>
                <ObservedSignIn handleSubmit={handleSubmit}/>
            </div>
        )
    }

    if (authentificationStore.mode === 'signup') {
        return (
            <div>
                <ObservedNavBar/>

            </div>
        )
    }

}

export const ObservedAuthentication = observer(Authentication);