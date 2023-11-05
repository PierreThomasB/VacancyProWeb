import {observer} from "mobx-react";
import React from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import DisplayForm from "../organisms/DisplayForm.tsx";
import InputForm from "../molecules/InputForm.tsx";
import RedirectLink from "../molecules/RedirectLink.tsx";
import {authentificationStore} from "../../stores/AuthentificationStore.ts";
const LeftImage = require('../../assets/images/sea.jpg');


function SignIn({handleSubmit}) {
    return (
        <div /*className={'auth-grid'}*/ className={'flex m-[5%] rounded-xl shadow-custom'}>
            <div /*className={'column'}*/ className={'flex w-1/2 justify-center flex-row flex-wrap'} >
               <img src={LeftImage} alt={'sea'} className={'h-full w-full object-contain rounded-l-xl'}/>
            </div>
            <div /*className={'column'}*/ className={'flex w-1/2 justify-center flex-row flex-wrap'}>
                <div /*className={'container-title-auth'}*/ className={'flex justify-center items-center flex-col w-full'}>
                    <LockOutlinedIcon /*className={'icon-auth'}*/ className={'text-black overflow-y-hidden m-icon-auth scale-150'}/>
                    <h1 /*className={'title-auth'}*/ className={'text-black text-xl font-bold overflow-y-hidden'}>CONNEXION</h1>
                </div>
                <DisplayForm handleSubmit={handleSubmit} inputs={[
                    <InputForm id={'email'} label={'Adresse mail'} disabled={false} value={''}/>,
                    <InputForm id={'password'} label={'Mot de passe'} disabled={false} value={''}/>,
                    <input type={'submit'} className={'btn-home-blue'} value={'SE CONNECTER'}/>
                ]}/>
                <RedirectLink message={'Pas de compte ? '} label={'Inscrivez-vous !'} handleMode={() => authentificationStore.onModeChange('signup')}/>
            </div>
        </div>
    )
}
export const ObservedSignIn = observer(SignIn)