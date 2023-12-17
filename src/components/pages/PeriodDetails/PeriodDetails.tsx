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
import User from "../../../models/User.ts";
import Activity from "../../../models/Activity.ts";
import Activities from "../../../models/Activities.ts";



const PeriodDetails:React.Fc = () => {
    const {state} = useLocation();
    const navigate = useNavigate();

    const [period,setPeriod] = useState<Period|null>(new Period(state["_id"],state["_name"],state["_description"], new Place(state._place["_name"],state._place["_id"],state._place["_urlPhoto"]) , state["_beginDate"], state["_endDate"], null , state._listUser.map(usr => new User(usr._id , usr._username , usr._email , null,false,null))));
    const [activities , setActivities] = useState<Activities>();
    const [users , setUser] = useState([]);
    const [loaded , setLoaded] = useState(false);


  const initActivities = async () => {
      let activities = await activityStore.handleGetAllActivities(period.id);
      setActivities(activities);
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


   const handleAddPeople =  async (userId:string) => {
        await periodStore.handleNewUserToPeriod(userId,period.id);
        wait(3000);

    }




  useEffect(() => {
      if(period !== null) {
          console.log(period);
          initActivities();
          initUsers();
          setLoaded(true);
      }
  },[])


    if(!loaded || period == null){
        return (
            <div>
                <img src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAN8AAADiCAMAAAD5w+JtAAAAhFBMVEX///+3t7fc3NzLy8t/f3+QkJCmpqZpaWkoKCgzMzNWVlbq6upFRUX8/Pzw8PD4+Pg4ODh1dXW7u7sAAADZ2dnh4eGIiIhOTk7z8/Oenp7T09Onp6fNzc3Gxsbg4OBPT09gYGAbGxsTExNbW1stLS1xcXGXl5caGhoLCws2NjY/Pz+Dg4NtJI2nAAANaElEQVR4nO2daYOqOgyGEUVRNhdwAXF3dJz///8u6OjQNm1TLDBnLu/Hc3DkIWmSpqUaRqtWrVq1+gcUxbHT9D1Up7TXm0x6k3XT91GNuudJ767JxG/6XipQ8k2X69xp+m60q1PAywA3Td+Pblk9UkHTN6RXpPmyMRg1fUd61afM1/to+o60yp/QfOc/5aAs36Tl+4fU8v1KBY7vo+rlsnxOpsYehJ98zDP1o6X80jJ8ftw7ZuqtIk/H7SrKW8+th+ZWKru4DJ+/2w3u2h0tPbespM4TLyeUAZbg87/p7oT1A/atouaSckudr4iXAc713TlK5twiJb5ddb4BqaOp8eYRmlJ4Eg9V5uvvSL5dzTPGlUVLOCdX5fMHtLZ671+mL4avL7pclW+1o/mOeu9fJnr4SUKMIl98ZOzXOJ+VCC5X5Pti8OrmY/3Tmnf5l6vxhaz56uZj40sGyL9cic8bsXh1xxc6P0hyhBJfwgSX+vNDBAxA64s7l1Dig8w3qrsfNYUAuSFGha8H4O1W1VDwFQB41pxXRSnwmUBwGQzqnyGBBuTV+Xg+DzRfE/18KITyPBTP1wGCy2DQxByemULk+oAdCc0XQHR1Tx6+9QGNQHhxD833BZnvq0oKvpaQg36B8wgsX3D+PeYjWxRiD0Xygd7ZSHB53A6YI2LgSiRfBOaG5jqlIWhA4H6QfBZkPtG8pGpBIcYC/AnHN4XMN2mi+fkUaMAvtt+L4nPA3BDWwcEV0oAoPgvKDZM6KPhaAhNda848cwyfA84bmvTOXB3IgEwZiuGD8BoNLnctoRHIGBDBN4W889j8KloMziOoKgbBBwWX5s2XTWgSiG9KXiTn+4DM16sPgy8fHIFkjpDyOaB3/o6deKABSc+S8kHm2/2WPTIQH9mqkPGtwVltpdsMw00n6ZuoqckaCjFER0jC502g4ILqKU2no+OoM5VfSCperfq5VqsUEaLBJF98NBK+Lmg++ff6lrtYjEajxcKdK+0Lnj7o7krkexlBA/YKpYeYDzQfIrikoxzuoe1CAXDaL2olJ5TlCDEfuxqGCS7pzh0VtUUPV6dPSeqkDuShhbaJkG8JFp6Su3Uski5zUnQPuEPz5YTij4Dd0B8TCPlKmM+b3rYjWtipxpLFy4ehMJR6YI54LRqI+IDFTJn5rAFtvFwucgROQb5sGIo+3xXmCP9M8/3s/4RaZjtRwJ/uFgBd5qCCBUgEX6YpfycW3Gt6GXBF873qmxic1fKnfdEWpssCDHIXEJ+vv+ITOkIDpvT+61eXDTQff7RPIc/UxpeJOwz7AN/LgN6c4ns+J2j08bdjTRc84+V8yHrVWYn4VgnHhOCS52scrQkDToTuueMMdGckoMPHFy8RGjBzUnh0pADgz66YIuDk50kDfBzzLec3Ed1odMb2akKhATMlIfSnPPGmkfWZtR5sP+iegs6OzXiE8PkdSvCUCTsOQAgYsBjn/WQ+yWQlxdzG8oG5IQIzHsmnMJ2SAmaEwJ9jljypTU3eMhP5YNj4Aux02fSEA++Bp/RKU0fmopnY5xzRZSgiojF4zH1GvYXENTO6m+IGizUCcMX0cakylLvfoKCUNCC7k7XjSum2N/U1NEfuo1kkpZ20r2o+qrxmYuemJx14o0Wv1O4YU5InHoRkNiTLNFx3tgBI43kWME+g6Uq32bwYQZjEZMB4LerOV9jm8+rpotRG+aAzkrum23ljicJDxJlVQq7Y+p38rQgrVegXxNbgeDzuLHICEIrLlbtusp3tMjlTBGGHZPEzyd/5ID+Sv6lC/Is5kQ88l1fJqSiW+2h/FWtexwoSedRc7DiFoqpSjAm1fNNT4UDqmtvbXFv/18c4qcalrOlN7ppqDU+ZQvGkMJe+tSxnLDXeVrljLVOUSGcVur7Kks0UqnldRzZt0uWhqThwbhdVvW3lS7IhtHOphPriWfqkuhNIvFDopJocNBHwLQZptTsqYgGgpk3SfL7tzap+vwh/5lQx39YVv8SlS8sVh1BTzOaMP1f+GqwumZXGF9B+ixGy+65HYLrX9Le9G+ua2N6tNvkpg6dtN4dFG9C1GjiViilotA3+gKxf3HOtrvkjk8j3ijM+kaLtD+HCbYgul/m04Upv2g2s2+KhQVfjcyshc51L9/Q2XwS5q9/0/s9WrVq1avU/kBPFUyU5ldeFaSpv0hd1TLllcNwpI02TIlBBZ/Q5dpV0+xyPwYlMlJTC66jvncXjbT/V4L41PrAPPSpJVyFgMLqVwsu0ZwDLWi9XRS66LY3nuifqb5Ube09VUgSnw/J47pjqVb6FV40BE8XIQmpB/C3nPb5K3gCev+GemQGJZ/5GdKmMz34Hz/0kZv2/ke/0x/n+uv16Gsffm/GzktO6Oxrj55v5r5q3SPfvmI+qQb136peKzr/ovxFhTnTJsSmPV1mBXR7QZpeaSgNq2mSjEfC2h1bSvHUZunWlb3BPb6exsmzohI9cgblRlFn5++klKsfm35lv1apVq1Z/XV60STNF2nNOdJ4dDtdtswekeJu0+1AaaiV0ztfTMNPJnq2aW6H2n3S5dBZqztAePmVfq1wBEMgLi3g6AYPhaVjQYdfEGWFml5a2I3Ite0joNB7UfPxu4KwZPG0G9GZDWvbnR52/Oed3UxZPmwH7NsOXE9Z2WJG3Bum6XU3D5APiGw73bj0Tn4hDlyUJPV/A4RueZjXsToYGXk18mZNuK95dznXNGvzzbsL9rMLdhIEpout2NW02EPBlOlR2rJYjptPlnkZ0FfENbbuS91ccoWvm0tbmnQgNmBEutLdcg1BG111rG/q+exIDnvY3re8KBKEMTieeYSRsBUMTHuCDtktpI7WdXjzDSG8SF83nFcA5v2XkyOG6qe76d2nZEh/NCF0NwxAx8LrphvIVz1O1pr/+Ssk/4rt7GeDw8m6g8WQ54S6f+swmDMNIpWUR72bXy3VGvYLzMZQ6aTYM30m68pyQifr1wSg0HwqhI2Ig+cfZ3s61n/WIR+V/zeTDcF/61wV8RNRMTQrihZcB0v8Ha2k/6HJdLuRStz85SJ20ZDZcxoiBF9NBuoCXCeM7fgEvMyF9OFEsN+HpUOLXnvmzoAIek4IcAs8MERF8frCLOpzpCz5m8kh6UdzBgTIe+9ACEs80ERsrPm1SM/Yzo72UcH9QiTNLjGsCn4tMZb50ZtOA7EXxSOqkw72CjwrmsE86yPMY81EOGuSHhDg+kTjSK813gHrWyaeM8GTjzzeVmW8N/yItYz6z2NV+0DnUT/ayfPYVssRyNZbNKtCveErMtwZPd2OCC8VXwCsCAnx7+KBSZ3cQD8MTcgiKRx9/pYGhK/ongef8pH6Azz5whlI8EJZs2BAjLqi5Id9nzVeILz7J9xorEYtn74+8wqC/Fzgpdl4fC4zHf0RscDELCd5zHI4BTwDgjJ/O+vxsaCOP4+fypaJ8zQaXonv6NN/LyaeAg9quoLLbXTiEWD6Of8I54QUAmY/rngUHNQA8+yqqR8IdPAxtZKW9BOnW4tG7gcz3YwUar8A3ZTJ87qGiZOYlF3CJAlvCAA4qO80MNN/PZ5jhV+AzJnuWby/2NfPM5ooTU7lyb5YdeLLJKkBnbn7MJ+RzQANKGmSbGz1zOuBbamQBk8oX9hxhcJHwGX0oxAwlXxlsxsQwlFicVLFjJhl49+8SBxcZn+ECfAdpueV1Cg0MTtHDk/+cIKWYveNgbiiGeAlf7wAA2ojvPc/ubbbTfoYefE/5zjqNce9nilN7LgmfBxnwgjoELBlc9peKf6QMwiNrcAmf0YFCDDreVyzIO6nWi4zPGwE54lLVOWdqCsDcQF4j4zM24Ahs9rfxvgUGF7qhLeMzBlCSH9UGwRdYudATODmfAfDZVS5GYwWOProgQPAlUIi5Nr4XfgnhMfNvBJ+xAywoT/JVC5w3ME8dw2eCZWjDP7EGjT46uBg4PjDEXJo1oAcFF2CfAYrPBENMQ7s/HwK9E7h1FJ/RB5Lgfls5BF9LTG7IheMLAPuJWxUVCxdcDCyfsboCgPvGcgQ0qwXNh+UzjlCO0HSsqLI8CG8DdvawfDGYIxoqQ8GmBHzfWD5jC5Whu8oQRALNx1lyR/Mt6eXOuwF1nSyqJGxuyIXmA9db7HEDIQbMDbwZN55vCfFdG3hNB5z28Z4zns/oQIDD2lsVwGImJzfkUuADm4UX5fbYu4JiCz+Oq/CtwRxR8wssYG7gO5EKnzG/ADkC8Wu4OgXxCR6xEl8AGlA/g0hAdBEtfirxGRYQYmrmA6KLKMSp8UFVTON8nE0jDynydX+h/YQZSpEP6DXVzMfEF3H8VuWLm7Yfnd4FuSGXKh+7YrYQX69bHlVdS1YJlfnoXRW19wnJxqAwuBhl+CIiR1zq7zIVAWV4JfiMXgHwAPwmZ+V6ASL2kZfgM3rj7zG4P9RcnH0rcKIwDM0NYpN1Gb6M0J3lGlR0/hhCQSbMdeX4sjyRPcBfscgpUVm+f0Ut3z+uv84n2P/5J8Tfv/s3xN9//UdEGbDZH/2pQJQBm74d/SJe8Phr3pnLe7noH4udLwXL+9D7i8Zr1apVq1atfpP+A4Nk3yJFxHEVAAAAAElFTkSuQmCC"}/>
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
                        <Card>
                            <Typography variant="h4" gutterBottom>Informations</Typography>
                            <SimpleTable colonnes={[{id: 1, label: "Date"}, {
                                id: 2,
                                label: period.getdateFormat()
                            }]} lignes={[{1: "Description", 2: period.description}, {
                                1: "Avec qui ?",
                                2: period.userListName
                            }]}/>
                        </Card>
                        <Card>
                            <Typography variant="h4" gutterBottom>Activitées </Typography>
                            <SimpleTable colonnes={[{id: 1, label: "Nom"}, {id: 2, label: "Debut"}, {id: 3, label: "Fin"}, {id: 4, label: "Adresse"}, {id: 5, label: "Actions"}]} lignes={activities}/>
                        </Card>
                        <Card>
                            <Typography variant="h4" gutterBottom>Météo</Typography>
                            <WeatherComponent lieux={period.place.name}/>

                        </Card>
                    </Stack>
                    <div style={{display: "flex", flexDirection: "row", gap: "1em", paddingTop: "2em"}}>
                        <DialogInput suggests={users} buttonValue={"Add a People"} titre={"Ajouter des personnes"}
                                     actionsWhenOpen={handleAddPeople}/>
                        <Button><Link to='/NewActivity' state={period}>Add an Activity</Link></Button>
                        <DialogConfirmation buttonValue={"Delete"} actions={deletePeriod}
                                            titre={"Voulez vous vraiment supprimer l'activité"}/>
                        <DialogWay lieux={period.place.name} titre={"Itinéraire"} buttonValue={"Itinéraire"}/>


                    </div>


                </Container>

            </div>


        );

    }


}



export const PeriodDetailsObserver = observer(PeriodDetails);