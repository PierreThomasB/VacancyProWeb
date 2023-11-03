import {observer} from "mobx-react";
// @ts-ignore
import React from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import DisplayForm from "../organisms/DisplayForm.tsx";
import InputForm from "../molecules/InputForm.tsx";
import RedirectLink from "../molecules/RedirectLink.tsx";
import {authentificationStore} from "../../stores/AuthentificationStore.ts";
const LeftImage = require('../../assets/images/sea.jpg');


function SignIn({handleSubmit}) {
    return (
        <div className={'auth-grid'}>
            <div className={'column'}>
               <img src={LeftImage} alt={'sea'} className={'hero-banner-img'}/>
            </div>
            <div className={'column'}>
                <div className={'container-title-auth'}>
                    <LockOutlinedIcon className={'icon-auth'}/>
                    <h1 className={'title-auth'}>CONNEXION</h1>
                </div>
                <DisplayForm handleSubmit={handleSubmit} inputs={[
                    <InputForm id={'email'} label={'Adresse mail'} disabled={false} value={''}/>,
                    <InputForm id={'password'} label={'Mot de passe'} disabled={false} value={''}/>,
                    <input type={'submit'} className={'btn-home-blue'} value={'SE CONNECTER'}/>
                ]}/>
                <RedirectLink message={'Pas de compte ?'} label={'Inscrivez-vous !'} handleMode={() => authentificationStore.onModeChange('signup')}/>
            </div>
        </div>
    )
}
export const ObservedSignIn = observer(SignIn)