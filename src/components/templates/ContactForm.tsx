import * as React from "react";
import {observer} from "mobx-react";
import {Box, Card} from "@mui/material";
import FormHeader from "../molecules/FormHeader.tsx";
import {Contacts} from "@mui/icons-material";
import DisplayForm from "../organisms/DisplayForm.tsx";
import InputForm from "../molecules/InputForm.tsx";
import RedirectLink from "../molecules/RedirectLink.tsx";
import {authentificationStore} from "../../stores/AuthentificationStore.ts";
import {sessionStore} from "../../stores/SessionStore.ts";
import TextAreaForm from "../molecules/TextAreaForm.tsx";
import TitleAuth from "../molecules/TitleAuth.tsx";
import Column from "../organisms/Column.tsx";
const LeftImage = require('../../assets/images/contact.jpg');
function ContactForm({handleSubmit}) {
    return (
        <Card className={'flex m-[4%] rounded-xl shadow-custom'}>
            <Column content={[
                <img src={LeftImage} alt={'sea'} className={'h-[700px] rounded-l-xl'}/>
            ]}/>
            <Column content={[
                <FormHeader inputs={[
                    <Contacts className={'text-black m-icon-auth scale-150'}/>,
                    <TitleAuth value={'CONTACTEZ-NOUS'} />
                ]}/>,
                <DisplayForm handleSubmit={handleSubmit} inputs={[
                    <Box className={"flex w-[88%]"}>
                        <InputForm id={'firstname'} label={'Prénom'} disabled={false} value={sessionStore.user?.firstname}/>
                        <InputForm id={'lastname'} label={'Nom de famille'} disabled={false} value={sessionStore.user?.lastname}/>
                    </Box>,
                    <InputForm id={'email'} label={'Adresse mail'} disabled={false} value={sessionStore.user?.email}/>,
                    <InputForm id={'subject'} label={'Sujet'} disabled={false}/>,
                    <TextAreaForm id={'message'} label={'Votre message...'} />,
                    <input type={'submit'} className={'btn-home-blue'} value={'ENVOYER'}/>
                ]}/>
            ]} />
        </Card>
    )
}
export const ObservedContactForm = observer(ContactForm)