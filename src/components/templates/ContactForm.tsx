import * as React from "react";
import {observer} from "mobx-react";
import {Box} from "@mui/material";
import FormHeader from "../molecules/FormHeader.tsx";
import {Contacts} from "@mui/icons-material";
import DisplayForm from "../organisms/DisplayForm.tsx";
import InputForm from "../molecules/InputForm.tsx";
import RedirectLink from "../molecules/RedirectLink.tsx";
import {authentificationStore} from "../../stores/AuthentificationStore.ts";
import {sessionStore} from "../../stores/SessionStore.ts";
import TextAreaForm from "../molecules/TextAreaForm.tsx";
const LeftImage = require('../../assets/images/contact.jpg');
function ContactForm({handleSubmit}) {
    return (
        <div className={'flex m-[4%] rounded-xl shadow-custom'}>
            <div className={'flex w-1/2 justify-center flex-row flex-wrap'} >
                <img src={LeftImage} alt={'sea'} className={'h-full w-full rounded-l-xl'}/>
            </div>
            <Box className={'flex w-1/2 justify-center flex-row flex-wrap'}>
                <FormHeader inputs={[
                    <Contacts className={'text-black m-icon-auth scale-150'}/>,
                    <h1 className={'text-black text-xl font-bold'}>CONTACTER UN ADMINISTRATEUR</h1>
                ]}/>
                <DisplayForm handleSubmit={handleSubmit} inputs={[
                    <Box className={"flex w-[88%]"}>
                        <InputForm id={'firstname'} label={'Prénom'} disabled={false} value={sessionStore.user?.firstname}/>
                        <InputForm id={'lastname'} label={'Nom de famille'} disabled={false} value={sessionStore.user?.lastname}/>
                    </Box>,
                    <InputForm id={'email'} label={'Adresse mail'} disabled={false} value={sessionStore.user?.email}/>,
                    <InputForm id={'subject'} label={'Sujet'} disabled={false}/>,
                    <TextAreaForm id={'message'} label={'Votre message...'} />,
                    <input type={'submit'} className={'btn-home-blue mt-2'} value={'ENVOYER'}/>
                ]}/>
                <RedirectLink message={'Pas de compte ? '} label={'Inscrivez-vous !'} handleMode={() => authentificationStore.onModeChange('signup')}/>
            </Box>
        </div>
    )
}
export const ObservedContactForm = observer(ContactForm)