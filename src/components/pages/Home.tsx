// @ts-ignore
import React from 'react';
import {useNavigate} from "react-router-dom";
import {ObservedNavBar} from '../templates/NavBar.tsx';
import {observer} from "mobx-react";


function Home() {
    const routes = require('../../routes.json')
    const navigate = useNavigate()

    return (
        <div>
            <ObservedNavBar/>
            <div className={'home-main-container'}>

            </div>
        </div>

    )
}
export const ObservedHome = observer(Home);