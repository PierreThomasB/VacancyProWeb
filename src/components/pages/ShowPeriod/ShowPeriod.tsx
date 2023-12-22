import {observer} from "mobx-react";
// @ts-ignore
import React, {useEffect, useState} from "react";
import { Container} from "@mui/material";
import {PeriodCard} from "../../molecules/PeriodCard.tsx";
import {ObservedNavBar} from "../../templates/NavBar.tsx";
import {useNavigate} from "react-router-dom";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {sessionStore} from "../../../stores/SessionStore.ts";
import Periods from "../../../models/Periods.ts";
import Period from "../../../models/Period.ts";
import {canGetAllPeriods} from "../../../stores/PeriodStore.ts";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';


const ShowPeriod = () => {


    const navigate = useNavigate();
    const [periods , setPeriods] = useState<Periods>();
    const [showedItems , setShowedItems] = useState<Period[]>([]);
    const [loaded , setLoaded] = useState<boolean>(false);

    const getPeriod =  async ( ) => {
        let result = await canGetAllPeriods.handleGetAllPeriod();
        if(result !== undefined ) {
            setPeriods(result);
            setShowedItems(result.defaultSort);

        }
    }

    useEffect(() => {
          getPeriod().then(
                () => {
                    setLoaded(true);
                }
          )

    }, [sessionStore.user])


    const navigateToUrl = (url : string) => {
        navigate(url)
    }

    const handlePastedTrips = () => {

        setShowedItems(periods.showOnlyPastedPeriods);

    }
    const handleAllTrips = () => {
        setShowedItems(periods.defaultSort);
    }
    const handleOncomingTrips = () => {
        setShowedItems(periods.showOnlyFuturePeriods);
    }
    const handleSortByDateAsc = () => {
        let copiedItems = [...showedItems];
        let sortedItems = periods.sortByPeriodsDateAsc(copiedItems);
        setShowedItems(sortedItems);

    }

    const handleSortByDateDesc = () => {
        let copiedItems = [...showedItems];
        let sortedItems = periods.sortByPeriodsDateDesc(copiedItems);
        setShowedItems(sortedItems);

       
    }
    if(!loaded) return (<div>loading</div>)

    return (
        <div>
            <ObservedNavBar/>
            <div style={{margin:"1%"}}>
                <ul style={{display:"flex", flexDirection:"row" , justifyContent:"space-around"}} >
                    <li><CalendarMonthIcon  fontSize={"large"}/> <input  type={'submit'} style={{cursor:"pointer"}} value={"Nouvelle période"} onClick={() => navigateToUrl("/newPeriod")}/></li>
                    <li><CalendarMonthIcon  fontSize={"large"}/> <input  type={'submit'}  style={{cursor:"pointer"}} value={"Periodes futures"} onClick={handleOncomingTrips}/></li>
                    <li><CalendarMonthIcon  fontSize={"large"}/>  <input  type={'submit'} style={{cursor:"pointer"}} value={"Période passée "} onClick={handlePastedTrips}/></li>
                    <li><CalendarMonthIcon  fontSize={"large"}/>  <input  type={'submit'} style={{cursor:"pointer"}} value={"Toutes les périodes"} onClick={handleAllTrips}/></li>
                </ul>
                <ul style={{paddingTop:"1em" , display:"flex", flexDirection:"row" , justifyContent:"center" , marginTop:"2%"}}>
                    <li>Trier par date : </li>
                    <li><ArrowDropDownIcon fontSize={"large"} /><input  type={'submit'} style={{cursor:"pointer"}} value={"Ascendant"} onClick={handleSortByDateAsc}/></li>
                    <li><ArrowDropUpIcon fontSize={"large"} /><input  type={'submit'} style={{cursor:"pointer"}} value={"Descandant"} onClick={handleSortByDateDesc}/></li>
                </ul>
                <Container sx={{padding:"2%"}} maxWidth="sm">
                    {
                        showedItems.map((item ) => {
                            console.log(item);
                        return(
                          <PeriodCard key={item.id} period={item as any} />
                        );
                    })}
                </Container>
                </div>
        </div>

        );
}

export const ShowPeriodObserver = observer(ShowPeriod);