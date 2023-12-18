import {CanLoadActivities} from "./Interface/Activities/CanLoadActivities.ts";
import {CanCreateActivity} from "./Interface/Activities/CanCreateActivity.ts";
import {api} from "../repositories/Api.ts";
import {makeAutoObservable} from "mobx";



export interface WeatherData {
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

class WeatherStore   {

    constructor() {
        makeAutoObservable(this)
    }

     getMeteo = async (lieux: string): Promise<WeatherData> => {
        try {
            let res: WeatherData = await api.getMeteo(lieux);
            return res;

        }catch (e) {
            console.log(e)
        }

    }

}

export const weatherStore = new WeatherStore();
