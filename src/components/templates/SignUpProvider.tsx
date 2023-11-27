import {observer} from "mobx-react";
import {Box, TextField} from "@mui/material";
import FormHeader from "../molecules/FormHeader.tsx";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import DisplayForm from "../organisms/DisplayForm.tsx";
import InputForm from "../molecules/InputForm.tsx";
import RedirectLink from "../molecules/RedirectLink.tsx";
import {authentificationStore} from "../../stores/AuthentificationStore.ts";
import * as React from "react";
const LeftImage = require('../../assets/images/sea.jpg');
function SignUpProvider({handleSubmit}) {
    return (
        <div className={'flex m-[4%] h-[630px] rounded-xl shadow-custom'}>
            <div className={'flex w-1/2 justify-center flex-row flex-wrap'} >
                <img src={LeftImage} alt={'sea'} className={'h-full w-full rounded-l-xl'}/>
            </div>
            <Box className={'flex w-1/2 justify-center flex-row flex-wrap'}>
                <FormHeader inputs={[
                    <LockOutlinedIcon className={'text-black m-icon-auth scale-150'}/>,
                    <h1 className={'text-black text-xl font-bold '}>Authentification externe réussie !</h1>,
                    <h2 className={'text-gray-500 text-xl overflow-y-hidden'}>Encore quelques informations...</h2>
                ]}/>
                <DisplayForm handleSubmit={handleSubmit} inputs={[
                    <Box className={"flex w-[88%]"}>
                        <InputForm id={'firstname'} label={'Prénom'} disabled={false}/>
                        <InputForm id={'lastname'} label={'Nom de famille'} disabled={false}/>
                    </Box>,
                    <InputForm id={'email'} label={'Adresse mail'} disabled={true} value={authentificationStore.emailProvider}/>,
                    <TextField
                        sx={{margin: '1%', display:'none'}}
                        required
                        type={"email"}
                        value={authentificationStore.emailProvider}
                        id={"email"}
                        name={"email"}
                        className={'w-[86%] h-[56px] m-[100px] bg-white'}
                        hidden={true}
                    />,
                    <input type={'submit'} className={'btn-home-blue'} value={'CREER MON COMPTE'}/>
                ]}/>
                <RedirectLink message={'Déjà un compte ? '} label={'Connectez-vous !'} handleMode={() => authentificationStore.onModeChange('signin')}/>
            </Box>
        </div>
    )
}
export const ObservedSignUpProvider = observer(SignUpProvider)