import {observer} from "mobx-react";
import * as React from "react";
import {ObservedNavBar} from "../templates/NavBar.tsx";


function Contact() {
    return (
        <div>
            <ObservedNavBar/>

        </div>
    )
}

export const observedContact = observer(Contact)