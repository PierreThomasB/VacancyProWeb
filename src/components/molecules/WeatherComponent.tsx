// @ts-ignore
import React, { useEffect, useState } from 'react';
import {api} from "../../repositories/Api.ts";

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
        console.log(lieux);
        let res:WeatherData  = await api.getMeteo(lieux);

        setWeatherData(res);
    };
    useEffect(() => {
        getWeather();
    }, []);

    return (
        <div style={{display:"flex" , justifyContent:"center" , flexDirection:"column"}}>
            {weatherData && (
                <>
                    <img alt={""} src={weatherData.current.weather_icons[0]}/>
                    <p>Ville: {weatherData.location.name}</p>
                    <p>Température: {weatherData.current.temperature}°C</p>
                    <p>Description: {weatherData.current.weather_descriptions.at(0)}</p>
                </>
            )}
        </div>
    );
};

