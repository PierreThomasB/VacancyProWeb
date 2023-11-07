import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
// @ts-ignore
import React from "react";
import {useNavigate} from "react-router-dom";


export const PeriodCard = () => {

    const navigate = useNavigate();


    const navigateToDetail = () => {
        navigate("/PeriodDetails");

    }
    return(



        <Card sx={{minWidth:"100%"}}>
            <CardMedia
                sx={{ height: 140 }}
                image="https://www.vivinter.fr/wp-content/uploads/2023/08/44_Vacances-dete-Comment-bien-se-detendre-2023-560x270.png"
                title="img"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Lizard
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    By Pierre Thomas
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                </Typography>
            </CardContent>
            <CardActions>
                <Button  onClick={ () => navigateToDetail()} size="small">Learn More</Button>
            </CardActions>


        </Card>
    )
}