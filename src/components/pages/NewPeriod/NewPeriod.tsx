
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
import User from "../../../models/User.ts";
import Place from "../../../models/Place.ts";
import {periodStore} from "../../../stores/PeriodStore.ts";
import {ObservedSnackBar} from "../../molecules/SnackBar.tsx";
import {authentificationStore} from "../../../stores/AuthentificationStore.ts";
import {useNavigate} from "react-router-dom";
import {wait} from "@testing-library/user-event/dist/utils";


function SendIcon() {
    return null;
}

function NewPeriod ()   {


    const navigate = useNavigate();

    const [name,setName] = useState("");
    const [description,setDescription] = useState("");
    const [startDate , setStartDate] = useState();
    const [endDate , setEndDate] = useState();
    const [place ,setPlace ] = useState(null);



    const doPost = async () => {
        if(periodStore.handleNewPeriod(name,description,place,startDate,endDate)){
             await wait(3000);
            //navigate("/periods");
        }
    }


    return (

     <form onSubmit={e => doPost()}>
         <ObservedNavBar/>

         <LocalizationProvider dateAdapter={AdapterDayjs}>
           <Container maxWidth={"sm"} >
              <Grid container spacing={3}>
                    <Grid item xs={12} >
                        <SimpleInput id={"Nom"} label={"Nom"} onInputChange={(val) => setName(val)} ></SimpleInput>
                    </Grid>
                      <Grid item xs={12} >
                          <TextArea id={"description"} label={"Description"} onTextAreaChanged={(val) => setDescription(val)}/>
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
                      <PlaceInput updateLieu={(val) => {

                          setPlace(val)

                      }}/>
                  </Grid>
                      <Grid item  style={{display:"flex" , alignItems:"center"}}>
                          <Button size={"large"}  onClick={() => doPost()}>
                              Valider
                          </Button>
                      </Grid>

                  </Grid>
               <ObservedSnackBar open={periodStore.open} message={periodStore.errorMsg} severity={periodStore.severity}/>
           </Container>
         </LocalizationProvider>

     </form>
        
    )
}

 export const NewPeriodObserver = observer(NewPeriod);