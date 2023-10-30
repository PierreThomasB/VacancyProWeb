
import * as React from "react";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { SimpleInput } from "../../molecules/SimpleInput";
import {observer} from "mobx-react";





function NewPeriod ()   {
    return (

     <div>
      <Typography variant="h6" gutterBottom>
        Hello
      </Typography>
      <Grid container spacing={3}>
            <Grid item xs={12} >
              <SimpleInput id={"Nom"} label={"Nom"} ></SimpleInput>
              </Grid>
              <Grid item xs={12} >
              <SimpleInput id={"Description"} label={"Description"} ></SimpleInput>
              </Grid>
              <Grid item xs={12}>
              <SimpleInput id={"Date"} label={"Date"} ></SimpleInput>
              </Grid>


          </Grid>

     </div>
        
    )
}

 export const NewPeriodObserver = observer(NewPeriod);