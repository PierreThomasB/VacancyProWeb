import {observer} from "mobx-react";
// @ts-ignore
import React from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import DisplayForm from "../organisms/DisplayForm.tsx";
import InputForm from "../molecules/InputForm.tsx";
import RedirectLink from "../molecules/RedirectLink.tsx";
import {authentificationStore} from "../../stores/AuthentificationStore.ts";
import FormHeader from "../molecules/FormHeader.tsx";
import {Box, Card, TextField} from "@mui/material";
import TitleAuth from "../molecules/TitleAuth.tsx";
import Column from "../organisms/Column.tsx";
const LeftImage = require('../../assets/images/sea.jpg');


function SignIn({handleSubmit}) {
    return (
        <Card className={'flex m-[4%] rounded-xl shadow-custom'}>
            <Column content={[
                <img src={LeftImage} alt={'sea'} className={'h-full w-full rounded-l-xl'}/>
                ]}/>
            <Column content={[
                <FormHeader inputs={[
                    <LockOutlinedIcon className={'text-black m-icon-auth scale-150'}/>,
                    <TitleAuth value={'CONNEXION'}/>
                ]}/>,
                <DisplayForm handleSubmit={handleSubmit} inputs={[
                    <InputForm id={'email'} label={'Adresse mail'} disabled={false}/>,
                    <InputForm id={'password'} label={'Mot de passe'} disabled={false}/>,
                    <input type={'submit'} className={'btn-home-blue'} value={'SE CONNECTER'}/>
                ]}/>,
                <RedirectLink message={'Pas de compte ? '} label={'Inscrivez-vous !'} handleMode={() => authentificationStore.onModeChange('signup')}/>
            ]}/>
        </Card>
    )
}
export const ObservedSignIn = observer(SignIn)