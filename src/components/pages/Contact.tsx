import {observer} from "mobx-react";
import * as React from "react";
import {ObservedNavBar} from "../templates/NavBar.tsx";
import {ObservedSnackBar} from "../molecules/SnackBar.tsx";
import {contactStore} from "../../stores/ContactStore.ts";
import {ObservedContactForm} from "../templates/ContactForm.tsx";


function Contact() {
    const handleSubmit = (event) => {
        event.preventDefault();
        let data = new FormData(event.currentTarget)
        contactStore.handleSubmit([...data.values()])
    }
    return (
        <div>
            <ObservedNavBar/>
            <ObservedContactForm handleSubmit={handleSubmit}/>
            <ObservedSnackBar open={contactStore.open} message={contactStore.errorMsg} severity={contactStore.severity}/>
        </div>
    )
}

export const ObservedContact = observer(Contact)