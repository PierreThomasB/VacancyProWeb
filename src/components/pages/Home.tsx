// @ts-ignore
import React from 'react';
import {useNavigate} from "react-router-dom";
import {ObservedNavBar} from '../templates/NavBar.tsx';
import {observer} from "mobx-react";
import {sessionStore} from "../../stores/SessionStore.ts";


function Home() {
    const routes = require('../../routes.json')
    const navigate = useNavigate()

    const navigateToPeriods = () => {
        navigate(routes.Periods)
    };

    const navigateToAuthentication = () => {
        navigate(routes.Authentication)
    };
    const navigateToAbout = () => {
        navigate(routes.About)
    };

    return (
        <div>
            <ObservedNavBar/>
            <div className={'home-main-container'}>
                <div className={'column'} style={{justifyContent: 'center'}}>
                    <h1 className={'home-main-title'}>Vacancy Pro.</h1>
                    <h2 className={'home-main-p'}>Votre compagnon de voyage ultime.</h2>
                    <div className={'row'}>
                        <div className={'column'}>
                            <input type={'submit'} className={'btn-home-blue'}
                                   value={sessionStore.user ? 'VOIR LES VOYAGES' : 'SE CONNECTER'}
                                   onClick={sessionStore.user ? navigateToPeriods : navigateToAuthentication}/>
                        </div>
                        <div className={'column'}>
                            <input type={'submit'} className={'btn-home-black'} value={'PLUS D\'INFORMATIONS'}
                                   onClick={navigateToAbout}/>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
export const ObservedHome = observer(Home);