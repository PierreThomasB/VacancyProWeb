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




    if(period.EndDate < new Date()) {
        return (

            <Card sx={{minWidth: "100%" , backgroundColor:"gray"}}>
                <CardMedia
                    sx={{height: 140}}
                    image={"https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&key=AIzaSyAeX0rGP22Zfco3WbT44TFHbKxqmPmIK_s&photo_reference=" + period.Place.urlPhoto}
                    title="img"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {period.Name}
                    </Typography>
                    <Typography sx={{mb: 1.5}} color="white">
                        By Pierre Thomas
                    </Typography>
                    <Typography variant="body2" color="white">
                        {period.Description}
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

            <Card sx={{minWidth: "100%"}}>
                <CardMedia
                    sx={{height: 140}}
                    image={"https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&key=AIzaSyAeX0rGP22Zfco3WbT44TFHbKxqmPmIK_s&photo_reference=" + period.Place.urlPhoto}
                    title="img"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {period.Name}
                    </Typography>
                    <Typography sx={{mb: 1.5}} color="text.secondary">
                        By Pierre Thomas
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {period.Description}
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