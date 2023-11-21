import {Box} from "@mui/material";
import FormHeader from "../molecules/FormHeader.tsx";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import DisplayForm from "../organisms/DisplayForm.tsx";
import InputForm from "../molecules/InputForm.tsx";
import RedirectLink from "../molecules/RedirectLink.tsx";
import {authentificationStore} from "../../stores/AuthentificationStore.ts";
import * as React from "react";
import {observer} from "mobx-react";
import DisplayProviders from "../organisms/DisplayProviders.tsx";
import DisplayGoogleProvider from "../molecules/DisplayGoogleProvider.tsx";
const LeftImage = require('../../assets/images/sea.jpg');
const config = require('../../config.json') ;
function SignUp({handleSubmit}) {
    return (
        <div /*className={'auth-grid'}*/ className={'flex m-[4%] h-[630px] rounded-xl shadow-custom'}>
            <div /*className={'column'}*/ className={'flex w-1/2 justify-center flex-row flex-wrap'} >
                <img src={LeftImage} alt={'sea'} className={'h-full w-full rounded-l-xl'}/>
            </div>
            <Box className={'flex w-1/2 justify-center flex-row flex-wrap'}>
                <FormHeader inputs={[
                    <LockOutlinedIcon className={'text-black m-icon-auth scale-150'}/>,
                    <h1 className={'text-black text-xl font-bold '}>CREATION DE COMPTE</h1>
                ]}/>
                <DisplayForm handleSubmit={handleSubmit} inputs={[
                    <Box className={"flex w-[88%]"}>
                        <InputForm id={'firstname'} label={'Prénom'} disabled={false}/>
                        <InputForm id={'lastname'} label={'Nom de famille'} disabled={false}/>
                    </Box>,
                    <InputForm id={'email'} label={'Adresse mail'} disabled={false}/>,
                    <InputForm id={'password'} label={'Mot de passe'} disabled={false}/>,
                    <InputForm id={'password'} label={'Confirmation du mot de passe'} disabled={false}/>,
                    <input type={'submit'} className={'btn-home-blue'} value={'CREER MON COMPTE'}/>
                ]}/>
                <RedirectLink message={'Déjà un compte ? '} label={'Connectez-vous !'} handleMode={() => authentificationStore.onModeChange('signin')}/>
                <p className={'text-black w-full text-center font-bold text-2xl'}>OU</p>
                <DisplayProviders providers={[
                    <DisplayGoogleProvider clientId={config.GoogleClientID} onSuccess={(response: any) => authentificationStore.onSuccess(response)} onError={() => authentificationStore.onError()}/>
                ]}/>
            </Box>
        </div>
    )
}
export const ObservedSignUp = observer(SignUp)