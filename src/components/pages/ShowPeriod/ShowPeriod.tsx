import {observer} from "mobx-react";
// @ts-ignore
import React, {useEffect, useState} from "react";
import {api} from "../../../repositories/Api.ts";
import {AppBar, Container, IconButton, Typography} from "@mui/material";
import {PeriodCard} from "../../molecules/PeriodCard.tsx";
import {ObservedNavBar} from "../../templates/NavBar.tsx";
import {useNavigate} from "react-router-dom";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {sessionStore} from "../../../stores/SessionStore.ts";
import Periods from "../../../models/Periods.ts";
import Period from "../../../models/Period.ts";
import {canGetAllPeriods} from "../../../stores/PeriodStore.ts";


const ShowPeriod = () => {


    const navigate = useNavigate();
    const [periods , setPeriods] = useState<Periods>();
    const [showedItems , setShowedItems] = useState<Period[]>([]);

    const getPeriod =  async ( ) => {
        let result = await canGetAllPeriods.handleGetAllPeriod();
        if(result != undefined ) {
            setPeriods(result);
            setShowedItems(result.sortByPeriodsDate);
            console.log(showedItems);
        }
    }

    useEffect(() => {
          getPeriod();

    }, [sessionStore.user])


    const navigateToUrl = (url) => {
        navigate(url)
    }

    const handlePastedTrips = () => {
        setShowedItems(periods.showOnlyPastedPeriods);

    }

    const handleAllTrips = () => {
        setShowedItems(periods.sortByPeriodsDate);
    }
    const handleOncomingTrips = () => {
        setShowedItems(periods.showOnlyFuturePeriods);
    }

    return (
        <div>
            <ObservedNavBar/>
            <ul style={{paddingTop:"1em" , display:"flex", flexDirection:"row" , justifyContent:"space-around"}} >
                <li> <CalendarMonthIcon fontSize={"large"}/> <input  type={'submit'} value={"New Period"} onClick={() => navigateToUrl("/newPeriod")}/></li>
                <li><CalendarMonthIcon fontSize={"large"}/> <input  type={'submit'} value={"Upcomming trips"} onClick={handleOncomingTrips}/></li>
                <li><CalendarMonthIcon fontSize={"large"}/>  <input  type={'submit'} value={"Pasted Trips"} onClick={handlePastedTrips}/></li>
                <li><CalendarMonthIcon fontSize={"large"}/>  <input  type={'submit'} value={"All Trips"} onClick={handleAllTrips}/></li>
            </ul>
            <Container sx={{padding:"5%"}} maxWidth="sm">

                {
                    showedItems.map(item => {
                    return(
                      <PeriodCard period={item as any} />
                    );
                })}
            </Container>
        </div>

        );
}

export const ShowPeriodObserver = observer(ShowPeriod);