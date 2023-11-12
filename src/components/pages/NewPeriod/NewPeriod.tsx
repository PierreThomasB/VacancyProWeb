
import * as React from "react";
import Grid from '@mui/material/Grid';
import { SimpleInput } from "../../molecules/SimpleInput.tsx";
import {observer} from "mobx-react";
import {Button, Container, CssBaseline, TextField} from "@mui/material";
import {ObservedNavBar} from "../../templates/NavBar.tsx";
import {TextArea} from "../../molecules/TextArea.tsx";
import { DesktopDatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {useState} from "react";

import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

// @ts-ignore
import {api} from '../../../repositories/Api.ts'

import Period from "../../../models/Period.ts";
import {PlaceInput} from "../../molecules/PlaceInput.tsx";


function SendIcon() {
    return null;
}

function NewPeriod ()   {

    let name = "";
    let description = "";

    const handleNomChanged = (valeur) => {
        console.log(valeur)
        name = valeur;
    }


    const handleDescriptionChanged = (valeur ) => {
        console.log(valeur);
        description = valeur;
    }
    const [startDate , setStartDate] = useState();
    const [endDate , setEndDate] = useState();



    const doPost = async () => {
        //let period:Period = new Period(name,description,null,startDate,endDate,null);

        console.log("hello");
        await api.newPeriod(period);
    }


    return (

     <form onSubmit={e => doPost()}>
         <ObservedNavBar/>

         <LocalizationProvider dateAdapter={AdapterDayjs}>
           <Container maxWidth={"sm"} >
              <Grid container spacing={3}>
                    <Grid item xs={12} >
                        <SimpleInput id={"Nom"} label={"Nom"} onInputChange={handleNomChanged} ></SimpleInput>
                    </Grid>
                      <Grid item xs={12} >
                          <TextArea id={"description"} label={"Description"} onTextAreaChanged={handleDescriptionChanged}/>
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
                      <PlaceInput/>

                  </Grid>
                      <Grid item  style={{display:"flex" , alignItems:"center"}}>
                          <Button size={"large"}  onClick={() => doPost()}>
                              Valider
                          </Button>
                      </Grid>

                  </Grid>
           </Container>
         </LocalizationProvider>

     </form>
        
    )
}

 export const NewPeriodObserver = observer(NewPeriod);