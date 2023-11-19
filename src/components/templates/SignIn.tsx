import {observer} from "mobx-react";
// @ts-ignore
import React from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import DisplayForm from "../organisms/DisplayForm.tsx";
import InputForm from "../molecules/InputForm.tsx";
import RedirectLink from "../molecules/RedirectLink.tsx";
import {authentificationStore} from "../../stores/AuthentificationStore.ts";
import FormHeader from "../molecules/FormHeader.tsx";
import {Box, TextField} from "@mui/material";
const LeftImage = require('../../assets/images/sea.jpg');


function SignIn({handleSubmit}) {
    return (
        <div /*className={'auth-grid'}*/ className={'flex m-[4%] h-[630px] rounded-xl shadow-custom'}>
            <div /*className={'column'}*/ className={'flex w-1/2 justify-center flex-row flex-wrap'} >
               <img src={LeftImage} alt={'sea'} className={'h-full w-full rounded-l-xl'}/>
            </div>
            <Box className={'flex w-1/2 justify-center flex-row flex-wrap'}>
                <FormHeader inputs={[
                    <LockOutlinedIcon className={'text-black m-icon-auth scale-150'}/>,
                    <h1 className={'text-black text-xl font-bold '}>CONNEXION</h1>
                ]}/>
                <DisplayForm handleSubmit={handleSubmit} inputs={[
                    <InputForm id={'email'} label={'Adresse mail'} disabled={false}/>,
                    <InputForm id={'password'} label={'Mot de passe'} disabled={false}/>,
                    <input type={'submit'} className={'btn-home-blue'} value={'SE CONNECTER'}/>
                ]}/>
                <RedirectLink message={'Pas de compte ? '} label={'Inscrivez-vous !'} handleMode={() => authentificationStore.onModeChange('signup')}/>
            </Box>
        </div>
    )
}
export const ObservedSignIn = observer(SignIn)