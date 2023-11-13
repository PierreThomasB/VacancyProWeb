import {observer} from "mobx-react";
import {ObservedNavBar} from "../../templates/NavBar.tsx";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
// @ts-ignore
import React, {useEffect, useState} from "react";
import Grid from "@mui/material/Grid";
import {Button, Card, Container, Paper, Stack, Typography} from "@mui/material";
import {SimpleTable} from "../../molecules/SimpleTable.tsx";
import {DialogInput} from "../../molecules/DialogInput.tsx";
import Period from "../../../models/Period.ts";
import {api} from "../../../repositories/Api.ts";
import Place from "../../../models/Place.ts";
import WeatherComponent from "../../molecules/WeatherComponent.tsx";
import Activity from "../../../models/Activity.ts";
const LeftImage = require('../../../assets/images/sea.jpg');



const PeriodDetails:React.Fc = () => {
    const {state} = useLocation();
    const navigate = useNavigate();


    const [period,setPeriod] = useState(state["period"] as Period);
    const [activities , setActivities] = useState([]);







  const initActivities = async () => {
      let activities = await api.getActivityByPeriod(period.Id);
      let tabresult = [];
      activities.forEach(activity => {
          tabresult.push({1:activity.BeginDate, 2:activity.BeginDate,3:activity.Description,4:"Rue "})
      })

      console.log(tabresult);
      setActivities(tabresult);
  }




  useEffect(() => {
      setPeriod(state["period"]);
      console.log(state);
      //initActivities();

  },[period])




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
                        <SimpleTable colonnes={[{id:1,label:"Jour"},{id:2,label:"Nom"},{id:3,label:"Description"},{id:4,label:"Adresse"}]} lignes={activities} />
                    </Card>
                  <Card >
                      <Typography variant="h4" gutterBottom>Météo</Typography>

                  </Card>
              </Stack>
                  <div style={{display:"flex",flexDirection:"column",margin:"5%"}}>
                        <DialogInput buttonValue={"Add a People"} contenu={"Ajouter des personnes"} champs={"Ajouter"} titre={"Ajouter des personnes"} />
                        <Button ><Link to='/NewActivity' state={period} >Add an Activity</Link></Button>
                        <Button>Delete</Button>
                  </div>

        </Container>


      </div>

  );


}



export const PeriodDetailsObserver = observer(PeriodDetails);