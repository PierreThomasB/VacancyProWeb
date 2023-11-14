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


const ShowPeriod = () => {


    const navigate = useNavigate();
    const [items , setItems] = useState([]);

    const getPeriod = async ( ) => {
        let result = await periodStore.handleGetAllPeriod();
        if(result != null) {
            setItems(result);
        }
    }

    useEffect(() => {
          getPeriod();

    }, [])


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
                {items.map(item => {

                    return(
                        // @ts-ignore
                      <PeriodCard Id={item.Id} Name={item.Name} Description={item.Description} Place={item.Place} BeginDate={item.BeginDate} EndDate={item.EndDate} Creator={null} ListUser={null} ListActivity={null}/>
                    );
                })}

            </Container>
        </div>

        );
}

export const ShowPeriodObserver = observer(ShowPeriod);