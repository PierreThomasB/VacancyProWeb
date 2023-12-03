import {observer} from "mobx-react";
import {ObservedNavBar} from "../../templates/NavBar.tsx";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
// @ts-ignore
import React, {useEffect, useState} from "react";
import Grid from "@mui/material/Grid";
import {Alert, Button, Card, Container, Paper, Stack, Typography} from "@mui/material";
import {SimpleTable} from "../../molecules/SimpleTable.tsx";
import {DialogInput} from "../../molecules/DialogInput.tsx";
import Period from "../../../models/Period.ts";
import {WeatherComponent} from "../../molecules/WeatherComponent.tsx";
import {DialogConfirmation} from "../../molecules/DialogConfirmation.tsx";
import {DialogWay} from "../../molecules/DialogWay.tsx";
import {ChatObserver} from "../../organisms/ChatSystem.tsx";
import {wait} from "@testing-library/user-event/dist/utils";
import {CalendarSystem} from "../../organisms/CalendarSystem.tsx";
import {periodStore} from "../../../stores/PeriodStore.ts";
import {activityStore} from "../../../stores/ActivityStore.ts";
import Place from "../../../models/Place.ts";



const PeriodDetails:React.Fc = () => {
    const {state} = useLocation();
    const navigate = useNavigate();

    const [period,setPeriod] = useState(new Period(state._id , state._name , state._description , new Place(state._place._name , state._place._id , state._place._urlPhoto) , state._beginDate , state._endDate , null,state._listUser));
    const [activities , setActivities] = useState([]);
    const [users , setUser] = useState([]);


  const initActivities = async () => {
      let activities = await activityStore.handleGetActivite(period.id);
      let tabresult = [];
      activities.forEach(activity => {

          tabresult.push({1:activity.beginDate, 2:activity.name,3:activity.description,4:activity.place.name, 5:<CalendarSystem period={activity}/>})
      })

      setActivities(tabresult);
  }

  const initUsers  = async () => {
      let res = await periodStore.handleGetAllUser(period.id);
      setUser(res);
    }

    const deletePeriod = async () => {
      await periodStore.handleDeletePeriod(period.id);
      wait(5000);
      navigate("/Periods");
  }

  const getDate = (date : Date) => {
      let month : number = date.getMonth()+1;
      return date.getDate()+"/"+month+"/"+date.getFullYear();
    }

   const handleAddPeople =  async (userId:string) => {
        await periodStore.handleNewUserToPeriod(userId,period.id);
        wait(3000);

    }




  useEffect(() => {
      if(period !== null) {
          console.log(period);

         period.listUser = state._listUser ;


          initActivities();
          initUsers();
      }
  },[period])


    if(period == null){
        return (
            <Alert severity="error">Vous n'étes pas autorisé sur cette page </Alert>
        );
    }




    return(


      <div>

        <ObservedNavBar/>
          <Container style={{paddingTop:"2%",display:"flex",flexDirection:"column",alignItems:"center" }} >
              <div style={{display:"flex",alignItems:"center" , flexDirection:"column" , gap:"1em" , paddingBottom:"2em" }} >
                  <Typography variant={"h3"}>{period.name}</Typography>
                  <img alt={""} src={"https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&key=AIzaSyAeX0rGP22Zfco3WbT44TFHbKxqmPmIK_s&photo_reference="+period.place.urlPhoto} />

                  <ChatObserver channel_name={"channel_"+period.id}/>
              </div>
              <Stack direction="row" spacing={10} style={{display:"flex",flexDirection:"row"}} >
                    <Card >
                        <Typography variant="h4" gutterBottom>Informations</Typography>
                        <SimpleTable colonnes={[{id:1,label:"Date"},{id:2,label: getDate(period.beginDate)+ " -> "+getDate(period.endDate)}]} lignes={[{1:"Description",2: period.description},{1:"Avex qui ?" ,2: period.userListName}]} />
                    </Card>
                    <Card >
                        <Typography variant="h4" gutterBottom>Activitées </Typography>
                        <SimpleTable colonnes={[{id:1,label:"Jour"},{id:2,label:"Nom"},{id:3,label:"Description"},{id:4,label:"Adresse"},{id:5,label:"Actions"}]} lignes={activities} />
                    </Card>
                  <Card >
                      <Typography variant="h4" gutterBottom>Météo</Typography>
                      <WeatherComponent lieux={period.place.name}  />

                  </Card>
              </Stack>
                  <div style={{display:"flex",flexDirection:"row",gap:"1em" , paddingTop:"2em"}}>
                        <DialogInput suggests={users} buttonValue={"Add a People"}  titre={"Ajouter des personnes"} actionsWhenOpen={handleAddPeople} />
                        <Button ><Link to='/NewActivity' state={period} >Add an Activity</Link></Button>
                       <DialogConfirmation buttonValue={"Delete"} actions={deletePeriod} titre={"Voulez vous vraiment supprimer l'activité"}/>
                      <DialogWay lieux={period.place.name} titre={"Itinéraire"} buttonValue={"Itinéraire"}/>


                  </div>



        </Container>

      </div>


  );


}



export const PeriodDetailsObserver = observer(PeriodDetails);