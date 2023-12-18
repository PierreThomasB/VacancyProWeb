import {observer} from "mobx-react";
import {ObservedNavBar} from "../../templates/NavBar.tsx";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
// @ts-ignore
import React, {useEffect, useState} from "react";
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
import {canDeletePeriods, canGetAllUserNotInPeriod, canInsertUserToPeriod} from "../../../stores/PeriodStore.ts";
import {canDeleteActivity, canLoadActivities} from "../../../stores/ActivityStore.ts";
import Place from "../../../models/Place.ts";
import User from "../../../models/User.ts";
import Activities from "../../../models/Activities.ts";
import Activity from "../../../models/Activity.ts";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import ForkRightIcon from '@mui/icons-material/ForkRight';


const PeriodDetails:React.Fc = () => {
    const {state} = useLocation();
    const navigate = useNavigate();

    const [period,setPeriod] = useState<Period|null>(new Period(state["_id"],state["_name"],state["_description"], new Place(state._place["_name"],state._place["_id"],state._place["_urlPhoto"]) , state["_beginDate"], state["_endDate"], null , state._listUser.map(usr => new User(usr._id , usr._username , usr._email , null,false,null))));
    const [activities , setActivities] = useState<Activities>(new Activities([]));
    const [users , setUser] = useState([]);
    const [loaded , setLoaded] = useState(0);


  const initActivities = async () => {
      let activities = await canLoadActivities.handleGetAllActivities(period.id);
      setActivities(activities);
      console.log(activities);
  }

  const initUsers  = async () => {
      let res = await canGetAllUserNotInPeriod.handleGetAllUser(period.id);
      setUser(res);
    }

    const deletePeriod = async  () => {
      canDeletePeriods.handleDeletePeriod(period.id);
      await wait(3000);
      navigate("/Periods");
  }


   const handleAddPeople =  async (userId:string) => {
         canInsertUserToPeriod.handleNewUserToPeriod(userId,period.id).then(
                () => {
                     window.location.reload();
                }
         )
    }
    const deleteActivity =  (activityId:number) => {
          canDeleteActivity.handleDeleteActivity(activityId).then(
                () => {
                    window.location.reload();
                }
          )
    }


    //{1:act.name, 2:act.getdateFormat(),3:act.place.name, 4:<CalendarSystem period={act} />}

    const getActivitiesFormat = () => {
          let tab = []
             activities.activities.forEach(activity =>{
                 tab.push({1:activity.name, 2:activity.getdateFormat(),3:activity.place.name, 4:<CalendarSystem activity={activity}/> , 5 : <DialogConfirmation buttonValue={<DeleteIcon/>} actions={() => {deleteActivity(activity.id)}} titre={"Voulez vous vraiment supprimer l'activité"}/>})
             } )

            return tab;
        }




  useEffect(() => {
      if(period !== null) {
          console.log(period);
          initActivities().then(
                () => {
                    setLoaded((val)=> val+1);
                }
          );
          initUsers().then(
                () => {
                    setLoaded((val) =>  val+1);
                }
          );

      }
  },[])


    if(loaded !== 2 || period == null){
        return (
            <div>
                Loading
            </div>



        );
    }


    if(loaded) {

        return (


            <div>

                <ObservedNavBar/>
                <Container style={{paddingTop: "2%", display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        gap: "1em",
                        paddingBottom: "2em"
                    }}>
                        <Typography variant={"h3"}>{period.name}</Typography>
                        <img alt={""}
                             src={"https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&key=AIzaSyAeX0rGP22Zfco3WbT44TFHbKxqmPmIK_s&photo_reference=" + period.place.urlPhoto}/>

                        <ChatObserver channel_name={"channel_" + period.id}/>
                    </div>
                    <Stack direction="row" spacing={10} style={{display: "flex", flexDirection: "row"}}>
                            <SimpleTable titre={"Infos"} colonnes={[{id: 1, label: "Date"}, {
                                id: 2,
                                label: period.getdateFormat()
                            }]} lignes={[{1: "Description", 2: period.description}, {
                                1: "Avec qui ?",
                                2: period.userListName
                            },{
                                1: "Lieu",
                                2: period.place.name
                            }

                            ]}/>
                            <SimpleTable titre={"Activités"} colonnes={[{id: 1, label: "Nom"}, {id: 2, label: "Date"}, {id: 3, label: "Adresse"}, {id: 4, label: "Calendrier"},{id:5, label:"Supprimer"}]} lignes={getActivitiesFormat()}/>
                            <WeatherComponent lieux={period.place.name}/>
                    </Stack>
                    <div style={{display: "flex", flexDirection: "row", gap: "1em", paddingTop: "2em"}}>
                        <DialogInput suggests={users} buttonValue={<PersonAddIcon/>} titre={"Ajouter des personnes"}
                                     actionsWhenOpen={handleAddPeople}/>
                        <Button><Link to='/NewActivity' state={period}>Add an Activity</Link></Button>
                        <DialogConfirmation buttonValue={<DeleteIcon/>} actions={deletePeriod}
                                            titre={"Voulez vous vraiment supprimer l'activité"}/>
                        <DialogWay lieux={period.place.name} titre={"Itinéraire"} buttonValue={<ForkRightIcon/>}/>
                    </div>
                </Container>

            </div>


        );

    }


}



export const PeriodDetailsObserver = observer(PeriodDetails);