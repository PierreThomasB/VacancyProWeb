import {observer} from "mobx-react";
import {ObservedNavBar} from "../../templates/NavBar.tsx";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
// @ts-ignore
import React, {useEffect, useState} from "react";
import {Alert, Button, Card, Container, Paper, Stack, Typography} from "@mui/material";
import {SimpleTable} from "../../molecules/SimpleTable.tsx";
import {DialogInput} from "../../molecules/DialogInput.tsx";
import Period from "../../../models/Period.ts";
import {WeatherComponent} from "../../organisms/WeatherComponent.tsx";
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
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import {ObservedSnackBar} from "../../molecules/SnackBar.tsx";


const PeriodDetails:React.Fc = () => {
    const {state} = useLocation();
    const navigate = useNavigate();

    const [period,setPeriod] = useState<Period|null>();
    const [activities , setActivities] = useState<Activities>(new Activities([]));
    const [users , setUser] = useState([]);
    const [loaded , setLoaded] = useState(0);





  const initActivities = async (period:Period) => {
      let activities = await canLoadActivities.handleGetAllActivities(period.id);
      setActivities(activities);
      console.log(activities);
  }

  const initUsers  = async (period:Period) => {
      let res = await canGetAllUserNotInPeriod.handleGetAllUser(period.id);
      setUser(res);
    }

    const deletePeriod = async  () => {
      if(await canDeletePeriods.handleDeletePeriod(period.id)){
          await wait(3000);
          navigate("/Periods");
      }
  }


   const handleAddPeople =  async (userId:string) => {
       if (await canInsertUserToPeriod.handleNewUserToPeriod(userId, period.id)) {
           await wait(2000);
           navigate("/Periods");

       }
   }
    const deleteActivity = async  (activityId:number) => {
          if(await canDeleteActivity.handleDeleteActivity(activityId)){
                        await wait(2000);
                        window.location.reload();
                    }
    }


    //{1:act.name, 2:act.getdateFormat(),3:act.place.name, 4:<CalendarSystem period={act} />}

    const getActivitiesFormat = () => {
          let tab = []
             activities.activities.forEach(activity =>{
                 tab.push({1:activity.name, 2:activity.getdateFormat(),3:activity.place.name, 4:<CalendarSystem activity={activity}/> , 5: <Link to='/ActivityEdit' state={activity}><ModeEditIcon/></Link>  ,6 : <DialogConfirmation buttonValue={<DeleteIcon/>} actions={() => {deleteActivity(activity.id)}} titre={"Voulez vous vraiment supprimer l'activité"}/> })
             } )

            return tab;
        }




  useEffect(() => {
      if(state !== null) {
          let period = new Period(state["_id"], state["_name"], state["_description"], new Place(state._place["_name"], state._place["_id"], state._place["_urlPhoto"]), state["_beginDate"], state["_endDate"], null, state._listUser.map(usr => new User(usr._id, usr._username, usr._email, null, false, null)))
          setPeriod(period);
              initActivities(period).then(
                  () => {
                      setLoaded((val) => val + 1);
                  }
              );
              initUsers(period).then(
                  () => {
                      setLoaded((val) => val + 1);
                  }
              );
      }else{
          navigate("/Periods");
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
                             <div style={{display:"flex",flexDirection:"column" , justifyContent:"center"}}>
                                {activities.size > 0 ? (
                                    <SimpleTable titre={"Activités"} colonnes={[{id: 1, label: "Nom"}, {id: 2, label: "Date"}, {id: 3, label: "Adresse"}, {id: 4, label: "Calendrier"},{id:5, label:"Editer"},{id:6 , label:"Supprimer"}]} lignes={getActivitiesFormat()}/>

                                ):(
                                    <Alert severity="warning">Aucune activité n'est prévue pour cette période</Alert>   )}
                                <Button><Link to='/NewActivity' state={period}>Ajouter une activité </Link></Button>
                             </div>
                            <WeatherComponent lieux={period.place.name}/>
                    </Stack>
                    <div style={{display: "flex", flexDirection: "row", gap: "1em", paddingTop: "2em"}}>
                        <DialogInput suggests={users} buttonValue={<PersonAddIcon/>} titre={"Ajouter des personnes"}
                                     actionsWhenOpen={handleAddPeople}/>
                        <DialogConfirmation buttonValue={<DeleteIcon/>} actions={deletePeriod}
                                            titre={"Voulez vous vraiment supprimer la période de vacances"}/>
                        <DialogWay lieux={period.place.name} titre={"Itinéraire"} buttonValue={<ForkRightIcon/>}/>
                    </div>
                </Container>
                <ObservedSnackBar open={canDeletePeriods.open} message={canDeletePeriods.errorMsg}  severity={canDeletePeriods.severity} />
                <ObservedSnackBar open={canDeleteActivity.open} message={canDeleteActivity.errorMsg}  severity={canDeleteActivity.severity} />

            </div>


        );

    }


}



export const PeriodDetailsObserver = observer(PeriodDetails);