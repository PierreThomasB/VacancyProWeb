import {observer} from "mobx-react";
import {ObservedNavBar} from "../../templates/NavBar.tsx";
import {useNavigate} from "react-router-dom";
// @ts-ignore
import React, {useEffect} from "react";
import Grid from "@mui/material/Grid";
import {Button, Container, Paper, Stack} from "@mui/material";
import {SimpleTable} from "../../molecules/SimpleTable.tsx";
import {DialogInput} from "../../molecules/DialogInput.tsx";
const LeftImage = require('../../../assets/images/sea.jpg');



const PeriodDetails = () => {

  const navigate = useNavigate();


  const toAddActivity = () => {
      navigate("/NewActivity");
  }


    return(

      <div>
        <ObservedNavBar/>



          <Container style={{paddingTop:"10%",display:"flex",flexDirection:"column",alignItems:"center"}} >
              <h1>Nom</h1>
              <p>Description</p>

          <Stack direction="row" spacing={10} style={{display:"flex",flexDirection:"row"}} >
                <Paper variant="outlined">
                    <SimpleTable colonnes={[{id:1,label:"Date"},{id:2,label:"Begin -> End"}]} lignes={[ {1:"item1col1" ,2: "item1col2"}, {1:"item2col1" ,2: "item2col2"}]} />
                </Paper>
                <Paper variant="outlined">
                    <SimpleTable colonnes={[{id:1,label:"Jour"},{id:2,label:"Nom"},{id:3,label:"Description"},{id:4,label:"Adresse"}]} lignes={[ {1:"item1col1" ,2: "item1col2"}, {1:"item2col1" ,2: "item2col2"}]} />
                </Paper>
          </Stack>
              <div style={{display:"flex",flexDirection:"column",margin:"5%"}}>
                    <DialogInput buttonValue={"Add People"} contenu={"Ajouter des personnes"} champs={"Ajouter"} titre={"Ajouter des personnes"} />
                    <Button onClick={() => toAddActivity()}>Add Activity</Button>
                    <Button>Delete</Button>
              </div>

        </Container>


      </div>

  );


}



export const PeriodDetailsObserver = observer(PeriodDetails);