// @ts-ignore
import React, { useEffect, useState } from 'react';
import {api} from "../../repositories/Api.ts";
import {Card, Typography} from "@mui/material";
import {Weather} from "../../models/Weather.ts";




export const WeatherComponent: React.FC = ({lieux}) => {

    const [weatherData, setWeatherData] = useState<Weather>(new Weather("",0,[],[],0,0));
    const [loaded, setLoaded] = useState<boolean>(false);


    const getWeather = async () => {
        let res  = await api.getMeteo(lieux);
        let jsonObject = JSON.parse(res);
        let meteo = new Weather(jsonObject.location.name,jsonObject.current.temperature,jsonObject.current.weather_icons,jsonObject.current.weather_descriptions,jsonObject.current.wind_speed,jsonObject.current.wind_degree);
        setWeatherData(meteo);
    };
    useEffect(() => {
        getWeather().then(
            () => setLoaded(true)
        )
    }, []);

    if(!loaded) return (<Typography>Chargement...</Typography>);
    return (
        <Card style={{display:"flex" , justifyContent:"center" , flexDirection:"column"}}>
                    <img alt={""} src={weatherData.weather_icons}/>
                    <p>Ville: {weatherData.name}</p>
                    <p>Température: {weatherData.temperature}°C</p>
                    <p>Description: {weatherData.weather_descriptions}</p>
        </Card>
    );
};


