// @ts-ignore
import React, { useEffect, useState } from 'react';
import {api} from "../../repositories/Api.ts";
import {WeatherData, weatherStore} from "../../stores/WeatherStore.ts";
import {Card, Typography} from "@mui/material";


export const WeatherComponent: React.FC = ({lieux}) => {

    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [loaded , setLoaded] = useState<boolean>(false);


    const getWeather = async () => {
            let res = await weatherStore.getMeteo(lieux)
            setWeatherData(res);
    };


    useEffect(() => {
        getWeather().then(() => setLoaded(true));
    }, []);


    if(loaded) {
        return (

            <Card style={{minWidth:"20%" , flexDirection:"column", display:"flex",justifyContent:"center"}}>
                    <Typography variant="h4" gutterBottom>{"Météo à "+weatherData.location.name}</Typography>


                                <img alt={""} src={weatherData.current.weather_icons[0]} style={{maxWidth:"60%"}} />
                                <p>Température: {weatherData.current.temperature}°C</p>
                                <p>Description: {weatherData.current.weather_descriptions.at(0)}</p>



                </Card>
        );
    }
};

