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

    const getPeriod =  async ( ) => {
        let result = await periodStore.handleGetAllPeriod();
        if(result != undefined ) {
            setItems(result);
        }
    }

    useEffect(() => {
          getPeriod();

    }, [sessionStore.user])


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
                    console.log(item);

                    return(
                        // @ts-ignore
                      <PeriodCard _id={item._id} _name={item._name} _description={item._description} _place={item._place} _beginDate={item._beginDate} _endDate={item._endDate} _creator={null} _listUser={item._listUser} ListActivity={null}/>
                    );
                })}

            </Container>
        </div>

        );
}

export const ShowPeriodObserver = observer(ShowPeriod);