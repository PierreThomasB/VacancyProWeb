import * as React from "react";
import {observer} from "mobx-react";
import {ObservedNavBar} from "../templates/NavBar.tsx";
import {ObservedSignIn} from "../templates/SignIn.tsx";
import {authentificationStore} from "../../stores/AuthentificationStore.ts";
import {ObservedSnackBar} from "../molecules/SnackBar.tsx";


function Authentication() {
    const handleSubmit = (event) => {
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

            </div>
        )
    }

}

export const ObservedAuthentication = observer(Authentication);