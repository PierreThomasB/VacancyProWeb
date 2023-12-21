

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

import Period from "../../../models/Period.ts";
import {PlaceInput} from "../../molecules/PlaceInput.tsx";
import Activity from "../../../models/Activity.ts";
import Place from "../../../models/Place.ts";
import {useLocation, useNavigate} from "react-router-dom";
import {wait} from "@testing-library/user-event/dist/utils";
import {ObservedSnackBar} from "../../molecules/SnackBar.tsx";
import {canEditActivity} from "../../../stores/ActivityStore.ts";
import * as dayjs from "dayjs";
import {Dayjs} from "dayjs";



function EditActivity () {

    const {state} = useLocation();
    const navigate = useNavigate();


    let activity : Activity = null;
    const [id,setId] = useState(-1);

    const [loaded,setLoaded] = useState(false);
    const [name,setName] = useState("");
    const [description,setDescription] = useState("");
    const [startDate , setStartDate] = useState<Dayjs>();
    const [endDate , setEndDate] = useState<Dayjs>();
    const [disabled , setDisabled] = useState(false);



    const doPut = async () => {

        let beginDateObj : Date = startDate.toDate();
        let endDateObj : Date = endDate.toDate();
        console.log(beginDateObj);
        console.log(endDateObj);
        if (await canEditActivity.handleEditActivity(id , name, description, beginDateObj, endDateObj )) {
            setDisabled(true)
            await wait(3000);
            navigate("/periods");
        }
    }
        const initActivities = () => {
            if (state !== null) {
                const activityObj = state;
                activity = new Activity(activityObj._id, activityObj._name, activityObj._description, activityObj._beginDate, activityObj._endDate, activityObj._place, activityObj._period);
                setId(activity.id);
                setName(activity.name);
                setDescription(activity.description);
                // @ts-ignore
                setStartDate(activity.dateFromCalendar(true));
                // @ts-ignore
                setEndDate(activity.dateFromCalendar(false));
                setLoaded(true);
            }
        }


        useEffect(() => {
            initActivities();
        }, [])


        if (!loaded) {
            return (
                <div>
                    <p>Loading</p>
                </div>
            )
        }

        if (loaded) {
            return (
                <form onSubmit={e => doPut()}>
                    <ObservedNavBar/>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Container maxWidth={"sm"}>
                            <Grid style={{marginTop: "10%", textAlign: "center", alignItems: "center"}} container
                                  spacing={4}>
                                <Grid item xs={12}>
                                    <Typography variant={"h4"}>Modifier votre activitée</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <SimpleInput value={name} id={"Nom"} label={"Nom"}
                                                 onInputChange={(val: string) => setName(val)}></SimpleInput>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextArea value={description} id={"description"} label={"Description"}
                                              onTextAreaChanged={(val: string) => setDescription(val)}/>
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
                                <Grid item style={{display: "flex", alignItems: "center"}}>
                                    <Button size={"large"} onClick={() => doPut()} disabled={disabled}>
                                        Valider
                                    </Button>
                                </Grid>
                            </Grid>
                            <ObservedSnackBar open={canEditActivity.open} message={canEditActivity.errorMsg}
                                              severity={canEditActivity.severity}/>
                        </Container>

                    </LocalizationProvider>

                </form>

            )
        }
    }

export const EditActivityObserver = observer(EditActivity)