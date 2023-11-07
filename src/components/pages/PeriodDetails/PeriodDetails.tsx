import {observer} from "mobx-react";
import {ObservedNavBar} from "../../templates/NavBar.tsx";
import {useNavigate} from "react-router-dom";
// @ts-ignore
import React, {useEffect} from "react";
import Grid from "@mui/material/Grid";
import {Container, Paper, Stack} from "@mui/material";
const LeftImage = require('../../../assets/images/sea.jpg');



const PeriodDetails = () => {

  const navigate = useNavigate();



  return(

      <div>
        <ObservedNavBar/>



          <Container  >

          <Stack direction="row" spacing={2}>
            <Paper variant="elevation">default variant</Paper>
            <Paper variant="outlined">outlined variant</Paper>
          </Stack>

        </Container>


      </div>

  );


}



export const PeriodDetailsObserver = observer(PeriodDetails);