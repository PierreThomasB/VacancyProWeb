
import * as React from "react";
import Grid from '@mui/material/Grid';
import { SimpleInput } from "../../molecules/SimpleInput.tsx";
import {observer} from "mobx-react";
import {Button, Container, CssBaseline, Snackbar, TextField, Typography} from "@mui/material";
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
import {canCreateActivity} from "../../../stores/ActivityStore.ts";
import {wait} from "@testing-library/user-event/dist/utils";
import {sessionStore} from "../../../stores/SessionStore.ts";
import {periodStore} from "../../../stores/PeriodStore.ts";
import {ObservedSnackBar} from "../../molecules/SnackBar.tsx";



function NewActivity ()   {

    const location = useLocation();
    const navigate = useNavigate();


    const [name,setName] = useState("");
    const [description,setDescription] = useState("");
    const [startDate , setStartDate] = useState();
    const [endDate , setEndDate] = useState();
    const [place ,setPlace ] = useState(new Place("","",""));
    const [period,setPeriod] = useState(new Period(-1,"","",null,null,null,null , null));




    const doPost = async () => {
        if(await canCreateActivity.handleNewActivity(name, description, startDate, endDate, place, period)){
            wait(3000);
            navigate("/Periods");
        }
    }
    const initPeriods = () => {
        const periodObj = location.state;
        const place = new Place(periodObj._place._name,periodObj._place._id,periodObj._place._urlPhoto)
        const per = new Period(periodObj._id ,periodObj._name,periodObj._description,place,periodObj._beginDate,periodObj._endDate,null,periodObj._listUser );
        console.log(per);
        setPeriod(per);
    }



    useEffect(() => {
        initPeriods();
    },[])


    return (

        <form onSubmit={e => doPost()}>
            <ObservedNavBar/>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Container maxWidth={"sm"} >
                    <Grid style={{marginTop:"10%" , textAlign:"center" , alignItems:"center"}} container spacing={4}>
                        <Grid item xs={12} >
                            <Typography variant={"h4"}>Nouvelle activité</Typography>
                        </Grid>
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
                    <ObservedSnackBar open={canCreateActivity.open} message={canCreateActivity.errorMsg} severity={canCreateActivity.severity} />
                </Container>

            </LocalizationProvider>

        </form>

    )
}

export const NewActivityObserver = observer(NewActivity);