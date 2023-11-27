import {Box, Card} from "@mui/material";
import FormHeader from "../molecules/FormHeader.tsx";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import DisplayForm from "../organisms/DisplayForm.tsx";
import InputForm from "../molecules/InputForm.tsx";
import RedirectLink from "../molecules/RedirectLink.tsx";
import {authentificationStore} from "../../stores/AuthentificationStore.ts";
import * as React from "react";
import {observer} from "mobx-react";
import TitleAuth from "../molecules/TitleAuth.tsx";
import Column from "../organisms/Column.tsx";
const LeftImage = require('../../assets/images/sea.jpg');

function SignUp({handleSubmit}) {
    return (
        <Card className={'flex m-[4%] rounded-xl shadow-custom'}>
            <Column content={[
                <img src={LeftImage} alt={'sea'} className={'h-full w-full rounded-l-xl'}/>
            ]}/>
            <Column content={[
                <FormHeader inputs={[
                    <LockOutlinedIcon className={'text-black m-icon-auth scale-150'}/>,
                    <TitleAuth value={'CREATION DE COMPTE'}/>
                ]}/>,
                <DisplayForm handleSubmit={handleSubmit} inputs={[
                    <Box className={"flex w-[88%]"}>
                        <InputForm id={'firstname'} label={'Prénom'} disabled={false}/>
                        <InputForm id={'lastname'} label={'Nom de famille'} disabled={false}/>
                    </Box>,
                    <InputForm id={'email'} label={'Adresse mail'} disabled={false}/>,
                    <InputForm id={'password'} label={'Mot de passe'} disabled={false}/>,
                    <InputForm id={'password'} label={'Confirmation du mot de passe'} disabled={false}/>,
                    <input type={'submit'} className={'btn-home-blue'} value={'CREER MON COMPTE'}/>
                ]}/>,
                <RedirectLink message={'Déjà un compte ? '} label={'Connectez-vous !'} handleMode={() => authentificationStore.onModeChange('signin')}/>
            ]}/>
        </Card>
    )
}
export const ObservedSignUp = observer(SignUp)