// @ts-ignore
import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {ObservedNavBar} from '../templates/NavBar.tsx';
import {observer} from "mobx-react";
import {sessionStore} from "../../stores/SessionStore.ts";
import {homeStore} from "../../stores/HomeStore.ts";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DesktopDatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import * as dayjs from "dayjs";
import {Card, CardContent} from "@mui/material";


function Home() {
    const routes = require('../../routes.json')
    const navigate = useNavigate()
    useEffect(() => {
        homeStore.init(dayjs(new Date()))
    },[])
    const entries = [...homeStore.userCountPerPlace.entries()]
    const mappedInfos = entries.map(([key,value]) => {
        let str = `(${value}) utilisateur(s) en ${key}`
        return <p key={key}>{str}</p>
    })
    const [date , setStartDate] = useState();


    const navigateToPeriods = () => {
        navigate(routes.Periods)
    };

    const navigateToAuthentication = () => {
        navigate(routes.Authentication)
    };
    const navigateToAbout = () => {
        navigate(routes.About)
    };

    const navigateToCreatePeriod = () => {
        navigate(routes.NewPeriod)
    }

    return (
        <div>
            <ObservedNavBar/>
            <div className={'home-main-container'}>
                <div className={'column'} style={{justifyContent: 'center'}}>
                    <h1 className={'home-main-title'}>Vacancy Pro.</h1>
                    <h2 className={'home-main-p'}>Votre compagnon de voyage ultime.</h2>
                    <div className={'row'}>
                        <div className={'column'}>
                            <h1 className={'home-main-key'}>{homeStore.usersCount < 9 ? `0${homeStore.usersCount}` : homeStore.usersCount}</h1>
                            <h2 className={'home-main-value'}>Utilisateur(s) inscrit(s)</h2>
                        </div>
                        <div className={'column'}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DesktopDatePicker
                                    label="Voir les utilisateur(s) en vacance"
                                    defaultValue={dayjs(new Date())}
                                    value={date}
                                    onChange={(newValue) => {
                                        setStartDate(newValue)
                                        homeStore.loadUsersCountInVacation(newValue.format('YYYY-MM-DDTHH:mm:ssZ'))
                                    }}
                                />
                            </LocalizationProvider>
                        </div>
                    </div>
                    <div className={'row'}>
                        <div className={'column'}>
                            <input type={'submit'} className={'btn-home-blue'}
                                   value={sessionStore.user ? 'VOIR LES VOYAGES' : 'SE CONNECTER'}
                                   onClick={sessionStore.user ? navigateToPeriods : navigateToAuthentication}/>
                        </div>
                        <div className={'column'}>
                            <input type={'submit'} className={'btn-home-orange'} value={'PLUS D\'INFORMATIONS'}
                                   onClick={navigateToAbout}/>

                        </div>
                        <div className={'column'}>
                            <input type={'submit'} className={'btn-home-black'} value={'New Period'}
                                   onClick={navigateToCreatePeriod}/>
                        </div>
                    </div>
                </div>
                <div className={'column'} style={{justifyContent: 'center'}}>
                    <Card variant="outlined">
                        <CardContent>
                            <h2 className={'home-main-p'}>Nombre d'utilisateur(s) en vacance</h2>
                            <div>
                                {mappedInfos}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>

    )
}
export const ObservedHome = observer(Home);