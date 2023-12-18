export class Weather {
    private readonly _name:string;
    private readonly _temperature: number;
    private readonly _weather_icons: string[];
    private readonly _weather_descriptions: string[];
    private readonly _wind_speed: number;
    private readonly _presure: number;


    constructor(name: string, temperature: number, weather_icons: string[], weather_descriptions: string[], wind_speed: number, presure: number) {
        this._name = name;
        this._temperature = temperature;
        this._weather_icons = weather_icons;
        this._weather_descriptions = weather_descriptions;
        this._wind_speed = wind_speed;
        this._presure = presure;
    }

    get name(): string {
        return this._name;
    }

    get temperature(): number {
        return this._temperature;
    }

    get weather_icons(): string {
        return this._weather_icons[0];
    }

    get weather_descriptions(): string {
        return this._weather_descriptions[0];
    }

    get wind_speed(): number {
        return this._wind_speed;
    }

    get presure(): number {
        return this._presure;
    }
}