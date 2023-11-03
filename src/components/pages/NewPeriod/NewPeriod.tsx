
import * as React from "react";
import Grid from '@mui/material/Grid';
import { SimpleInput } from "../../molecules/SimpleInput.tsx";
import {observer} from "mobx-react";
import {Container, CssBaseline, TextField} from "@mui/material";
import {ObservedNavBar} from "../../templates/NavBar.tsx";
import {TextArea} from "../../molecules/TextArea.tsx";
import { DesktopDatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {useState} from "react";

import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Form} from "react-router-dom";




function NewPeriod ()   {

    const handleNomChanged = (valeur) => {
        console.log(valeur)
    }


    const handleDescriptionChanged = (valeur ) => {
        console.log(description);
    }
    const [description,setDescription] = useState("");
    const [startDate , setStartDate] = useState();
    const [endDate , setEndDate] = useState();



    const doPost = () => {

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
                          <TextArea  id={"description"} label={"Description"} onTextAreaChanged={handleDescriptionChanged}/>
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
                  </Grid>
           </Container>
         </LocalizationProvider>

     </form>
        
    )
}

 export const NewPeriodObserver = observer(NewPeriod);