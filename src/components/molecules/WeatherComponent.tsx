// @ts-ignore
import React, { useEffect, useState } from 'react';
import {api} from "../../repositories/Api.ts";
import {Card, Typography} from "@mui/material";


interface WeatherData {
    location: {
        name:string;
    };
    current: {
        temperature: number;
        weather_icons:[string];
        weather_descriptions:[]
        wind_speed:number,
        presure:number,
    };
}


export const WeatherComponent: React.FC = ({lieux}) => {

    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);


    const getWeather = async () => {
        //let res:WeatherData  = await api.getMeteo(lieux);
        //setWeatherData(res);
    };
    useEffect(() => {
        getWeather();
    }, []);


    /**
     *
     *  {weatherData && (
     *                     <>
     *                         <Typography variant="h4" gutterBottom>{"Météo à "+lieux}</Typography>
     *                         <img alt={""} src={weatherData.current.weather_icons[0]}/>
     *
     *                         <p>Température: {weatherData.current.temperature}°C</p>
     *                         <p>Description: {weatherData.current.weather_descriptions.at(0)}</p>
     *                     </>
     *                 )}
     */
    return (
        <Card style={{minWidth:"20%" , flexDirection:"column", display:"flex",justifyContent:"center"}}>





        </Card>
    );
};

