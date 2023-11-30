import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
// @ts-ignore
import React, {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import Period from "../../models/Period.ts";


export const PeriodCard = (period : Period) => {

    const navigate = useNavigate();


    const navigateToDetail = () => {
        navigate("/PeriodDetails", {state : period });
    }

    const getDate = (date : Date):string   =>  {
        const dateComp = new Date(date);
        let month : number =dateComp.getMonth()+1
        return dateComp.getDate()+"/"+month+"/"+dateComp.getFullYear();
    }




    useEffect(() => {

    }, [period]);



    if(period._endDate < new Date()) {
        return (

            <Card sx={{minWidth: "100%" , backgroundColor:"gray" ,  marginBottom:"10%" ,textAlign:"center"}}>
                <CardMedia
                    sx={{height: 140}}
                    image={"https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&key=AIzaSyAeX0rGP22Zfco3WbT44TFHbKxqmPmIK_s&photo_reference=" + period._place._urlPhoto}
                    title="img"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {period._name}
                    </Typography>
                    <Typography sx={{mb: 1.5}} color="white">
                        {getDate(period._beginDate)+" -> "+getDate(period._endDate)}
                    </Typography>
                    <Typography variant="body2" color="white">
                        {period._description}
                    </Typography>
                    <Typography variant="body2" color="red">
                        Voyage dans le passé
                    </Typography>
                </CardContent>
                <CardActions style={{display: "flex", justifyContent: "center"}}>
                    <Button onClick={() => {
                        navigateToDetail()
                    }}>Details</Button>
                </CardActions>


            </Card>
        )
    }else{

        return (

            <Card sx={{minWidth: "100%" , marginBottom:"10%" ,textAlign:"center"}}>
                <CardMedia
                    sx={{height: 140}}
                    image={"https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&key=AIzaSyAeX0rGP22Zfco3WbT44TFHbKxqmPmIK_s&photo_reference=" + period._place._urlPhoto}
                    title="img"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {period._name}
                    </Typography>
                    <Typography sx={{mb: 1.5}} color="text.secondary">
                        {getDate(period._beginDate)+" -> "+getDate(period._endDate)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {period._description}
                    </Typography>
                </CardContent>
                <CardActions style={{display: "flex", justifyContent: "center"}}>
                    <Button onClick={() => {
                        navigateToDetail()
                    }}>Details</Button>
                </CardActions>


            </Card>
        );
    }
}