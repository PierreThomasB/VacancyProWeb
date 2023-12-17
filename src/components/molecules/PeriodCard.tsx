import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
// @ts-ignore
import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Period from "../../models/Period.ts";
import {periodStore} from "../../stores/PeriodStore.ts";


export const PeriodCard = ({period}) => {

    const navigate = useNavigate();
    const [periodObj] = useState(period as Period);


    const navigateToDetail = () => {
        periodStore.period = period;
        navigate("/PeriodDetails", {state : period });
    }

    const getDate = (date : Date):string   =>  {
        const dateComp = new Date(date);
        let month : number =dateComp.getMonth()+1
        return dateComp.getDate()+"/"+month+"/"+dateComp.getFullYear();
    }




    useEffect(() => {

    }, [period]);



    const styleCard = () => {
        if(periodObj.endDate < new Date()) {
            return {
                minWidth: "100%",
                backgroundColor: "gray",
                marginBottom: "10%",
                textAlign: "center"
            }
        }else{
            return {
                minWidth: "100%",
                backgroundColor: "white",
                marginBottom: "10%",
                textAlign: "center"
            }
        }
    }

        return (

            <Card sx={styleCard}>
                <CardMedia
                    sx={{height: 140}}
                    image={"https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&key=AIzaSyAeX0rGP22Zfco3WbT44TFHbKxqmPmIK_s&photo_reference=" + periodObj.place.urlPhoto}
                    title="img"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {periodObj.name}
                    </Typography>
                    <Typography sx={{mb: 1.5}} >
                        {periodObj.getdateFormat()}
                    </Typography>
                    <Typography variant="body2" >
                        {periodObj.description}
                    </Typography>
                    {periodObj.endDate < new Date() ? <Typography variant="body2" >  Voyage passé </Typography> : <div/> }
                </CardContent>
                <CardActions style={{display: "flex", justifyContent: "center"}}>
                    <Button onClick={() => {
                        navigateToDetail()
                    }}>Details</Button>
                </CardActions>


            </Card>
        )




}