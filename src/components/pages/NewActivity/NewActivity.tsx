
import * as React from "react";
import Grid from '@mui/material/Grid';
import { SimpleInput } from "../../molecules/SimpleInput.tsx";
import {observer} from "mobx-react";
import {Button, Container, CssBaseline, Snackbar, TextField} from "@mui/material";
import {ObservedNavBar} from "../../templates/NavBar.tsx";
import {TextArea} from "../../molecules/TextArea.tsx";
import { DesktopDatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {useEffect, useState} from "react";

import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

// @ts-ignore
import {api} from '../../../repositories/Api.ts'

import Period from "../../../models/Period.ts";
import {PlaceInput} from "../../molecules/PlaceInput.tsx";
import Activity from "../../../models/Activity.ts";
import Place from "../../../models/Place.ts";
import {useLocation, useNavigate} from "react-router-dom";
import {activityStore} from "../../../stores/ActivityStore.ts";
import {wait} from "@testing-library/user-event/dist/utils";
import {sessionStore} from "../../../stores/SessionStore.ts";



function NewActivity ()   {

    const location = useLocation();
    const navigate = useNavigate();


    const [name,setName] = useState("");
    const [description,setDescription] = useState("");
    const [startDate , setStartDate] = useState();
    const [endDate , setEndDate] = useState();
    const [place ,setPlace ] = useState(new Place("","",""));
    const [period,setPeriod] = useState(new Period(-1,"","",null,null,null,null));




    const doPost = async () => {
        if(activityStore.handleNewActivity(name,description,startDate,endDate,place,period)){
            wait(3000);
            navigate("/Periods");
        }
    }
    const initPeriods = () => {
        const periodObj = location.state;
        let periodTemp : Period = new Period(periodObj.Id,periodObj.Name,periodObj.Description, periodObj.Place,periodObj.BeginDate,periodObj.EndDate,periodObj.Creator);
        setPeriod(periodTemp);
    }



    useEffect(() => {
        console.log(sessionStore.loadUser())
        initPeriods();





    },[])


    return (

        <form onSubmit={e => doPost()}>
            <ObservedNavBar/>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Container maxWidth={"sm"} >
                    <Grid container spacing={3}>
                        <Grid item xs={12} >
                            <SimpleInput id={"Nom"} label={"Nom"} onInputChange={(val:string) => setName(val)} ></SimpleInput>
                        </Grid>
                        <Grid item xs={12} >
                            <TextArea id={"description"} label={"Description"} onTextAreaChanged={(val:string) => setDescription(val)}/>
                        </Grid>
                        <Grid item xs={6}>
                            <DesktopDatePicker
                                label="Date Debut"
                                value={startDate}
                                onChange={(newValue) => setStartDate(newValue)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <DesktopDatePicker
                                label="Date Fin"
                                value={endDate}
                                onChange={(newValue) => setEndDate(newValue)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <PlaceInput updateLieu={(val:Place) => {setPlace(val)}}
                            />
                        </Grid>
                        <Grid item  style={{display:"flex" , alignItems:"center"}}>
                            <Button size={"large"}  onClick={() => doPost()}>
                                Valider
                            </Button>
                        </Grid>
                    </Grid>
                    <Snackbar open={activityStore.open} message={activityStore.errorMsg} />
                </Container>

            </LocalizationProvider>

        </form>

    )
}

export const NewActivityObserver = observer(NewActivity);