import {observer} from "mobx-react";
// @ts-ignore
import React, {useEffect, useState} from "react";
import {api} from "../../../repositories/Api.ts";
import {AppBar, Container, IconButton, Typography} from "@mui/material";
import {PeriodCard} from "../../molecules/PeriodCard.tsx";
import {ObservedNavBar} from "../../templates/NavBar.tsx";
import {useNavigate} from "react-router-dom";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {periodStore} from "../../../stores/PeriodStore.ts";
import {sessionStore} from "../../../stores/SessionStore.ts";


const ShowPeriod = () => {


    const navigate = useNavigate();
    const [items , setItems] = useState([]);
    const [showedItems , setShowedItems] = useState([]);

    const getPeriod =  async ( ) => {
        let result = await periodStore.handleGetAllPeriod();
        if(result != undefined ) {
            setItems(result);
            setShowedItems(result);
        }
    }

    useEffect(() => {
          getPeriod();

    }, [sessionStore.user])


    const navigateToUrl = (url) => {
        navigate(url)
    }

    const handlePastedTrips = () => {
        let tempResult = [];
        items.forEach(item => {
            if(item.endDate < new Date()){
                tempResult.push(item);
            }
        })
        setShowedItems(tempResult);

    }

    const handleAllTrips = () => {
        setShowedItems(items);
    }
    const handleOncomingTrips = () => {
        let tempResult = [];
        items.forEach(item => {
            if(item.endDate > new Date()){
                tempResult.push(item);
            }
        })
        setShowedItems(tempResult);

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
                {showedItems.map(item => {


                    return(
                        // @ts-ignore
                      <PeriodCard _id={item.id} _name={item.name} _description={item.description} _place={item.place} _beginDate={item.beginDate} _endDate={item.endDate} _creator={null} _listUser={item.listUser} ListActivity={null}/>
                    );
                })}
            </Container>
        </div>

        );
}

export const ShowPeriodObserver = observer(ShowPeriod);