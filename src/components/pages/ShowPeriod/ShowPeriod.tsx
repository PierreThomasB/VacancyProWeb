import {observer} from "mobx-react";
// @ts-ignore
import React, {useEffect} from "react";
import {api} from "../../../repositories/Api.ts";
import {AppBar, Container, IconButton, Typography} from "@mui/material";
import {PeriodCard} from "../../molecules/PeriodCard.tsx";
import {ObservedNavBar} from "../../templates/NavBar.tsx";
import {useNavigate} from "react-router-dom";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';


const ShowPeriod = () => {


    const navigate = useNavigate();


    useEffect(() => {
        const getPeriod = async ( ) => {
            let res = await api.getPeriodByUser();
        }



    })


    const navigateToUrl = (url) => {
        navigate(url)
    }

    return (
        <div>
            <ObservedNavBar/>
            <ul style={{paddingTop:"1em" , display:"flex", flexDirection:"row" , justifyContent:"space-around"}} >
                <li> <CalendarMonthIcon fontSize={"large"}/> <input  type={'submit'} value={"New Period"} onClick={() => navigateToUrl("/newPeriod")}/></li>
                <li><CalendarMonthIcon fontSize={"large"}/> <input  type={'submit'} value={"Upcomming trips"}/></li>
                <li><CalendarMonthIcon fontSize={"large"}/>  <input  type={'submit'} value={"New Period"}/></li>
                <li><CalendarMonthIcon fontSize={"large"}/>  <input  type={'submit'} value={"All Trips"}/></li>
            </ul>
            <hr/>
            <Container sx={{padding:"5%"}} maxWidth="sm">
                <PeriodCard></PeriodCard>

            </Container>
        </div>

        );
}

export const ShowPeriodObserver = observer(ShowPeriod);