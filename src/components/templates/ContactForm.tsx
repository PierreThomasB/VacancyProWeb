import * as React from "react";
import {observer} from "mobx-react";
import {Box, TextareaAutosize} from "@mui/material";
import FormHeader from "../molecules/FormHeader.tsx";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import DisplayForm from "../organisms/DisplayForm.tsx";
import InputForm from "../molecules/InputForm.tsx";
import RedirectLink from "../molecules/RedirectLink.tsx";
import {authentificationStore} from "../../stores/AuthentificationStore.ts";
import {sessionStore} from "../../stores/SessionStore.ts";
import TextAreaForm from "../molecules/TextAreaForm.tsx";
const LeftImage = require('../../assets/images/sea.jpg');
function ContactForm({handleSubmit}) {
    return (
        <div /*className={'auth-grid'}*/ className={'flex m-[4%] h-5/6 rounded-xl shadow-custom'}>
            <div /*className={'column'}*/ className={'flex w-1/2 justify-center flex-row flex-wrap'} >
                <img src={LeftImage} alt={'sea'} className={'h-full w-full object-contain rounded-l-xl'}/>
            </div>
            <Box className={'flex w-1/2 justify-center flex-row flex-wrap'}>
                <FormHeader inputs={[
                    <SupervisorAccountIcon className={'text-black overflow-y-hidden m-icon-auth scale-150'}/>,
                    <h1 className={'text-black text-xl font-bold overflow-y-hidden'}>CONTACTER UN ADMINISTRATEUR</h1>
                ]}/>
                <DisplayForm handleSubmit={handleSubmit} inputs={[
                    <Box className={"flex w-[88%]"}>
                        <InputForm id={'firstname'} label={'Prénom'} disabled={false} value={sessionStore.user?.firstname}/>
                        <InputForm id={'lastname'} label={'Nom de famille'} disabled={false} value={sessionStore.user?.lastname}/>
                    </Box>,
                    <InputForm id={'email'} label={'Adresse mail'} disabled={false} value={sessionStore.user?.email}/>,
                    <InputForm id={'subject'} label={'Sujet'} disabled={false} value={''}/>,
                    <TextAreaForm id={'message'} label={'Votre message...'} />,
                    <input type={'submit'} className={'btn-home-blue'} value={'ENVOYER'}/>
                ]}/>
            </Box>
        </div>
    )
}
export const ObservedContactForm = observer(ContactForm)