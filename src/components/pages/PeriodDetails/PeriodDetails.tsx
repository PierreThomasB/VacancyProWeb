import {observer} from "mobx-react";
import {ObservedNavBar} from "../../templates/NavBar.tsx";
import {useLocation, useNavigate} from "react-router-dom";
// @ts-ignore
import React, {useEffect, useState} from "react";
import Grid from "@mui/material/Grid";
import {Button, Card, Container, Paper, Stack, Typography} from "@mui/material";
import {SimpleTable} from "../../molecules/SimpleTable.tsx";
import {DialogInput} from "../../molecules/DialogInput.tsx";
import Period from "../../../models/Period.ts";
const LeftImage = require('../../../assets/images/sea.jpg');



const PeriodDetails = () => {

  const navigate = useNavigate();

  const [period,setPeriod] = useState(new Period(-1,"","",null,null,null,null));
  const [activities , setActivities] = useState([]);


  const location = useLocation();

  const initPeriods = () => {
      const periodObj = location.state;
      let periodTemp : Period = new Period(periodObj.Id,periodObj.Name,periodObj.Description, periodObj.Place,periodObj.BeginDate,periodObj.EndDate,null);
      setPeriod(periodTemp);

  }

  const initActivities = () => {
      let tempActivities = [];
      period.ListActivity.forEach(activity => {
          tempActivities.push({1:activity._beginDate,2:activity._name,3:activity._desc,4:activity._place.Name})
      })
      setActivities(tempActivities);
  }


  useEffect(() => {
      initPeriods();
     initActivities();
  },[])


  const toAddActivity = () => {
      navigate("/NewActivity");
  }

//"https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&key=AIzaSyAeX0rGP22Zfco3WbT44TFHbKxqmPmIK_s&photo_reference="
    return(

      <div>
        <ObservedNavBar/>



          <Container style={{paddingTop:"10%",display:"flex",flexDirection:"column",alignItems:"center" }} >
              <div>
                  <h1>{period.Name}</h1>
                  <p>{period.Description}</p>
              </div>

              <Stack direction="row" spacing={10} style={{display:"flex",flexDirection:"row"}} >
                    <Card >
                        <Typography variant="h4" gutterBottom>Informations</Typography>

                        <SimpleTable colonnes={[{id:1,label:"Date"},{id:2,label: period.jourMoisDebut+ " -> "+period.jourMoisFin}]} lignes={[ {1:"Avex qui ?" ,2: "X"}, {1:"item2col1" ,2: "item2col2"}]} />
                    </Card>
                    <Card >
                        <Typography variant="h4" gutterBottom>Activitées </Typography>

                        <SimpleTable colonnes={[{id:1,label:"Jour"},{id:2,label:"Nom"},{id:3,label:"Description"},{id:4,label:"Adresse"}]} lignes={ activities} />
                    </Card>
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