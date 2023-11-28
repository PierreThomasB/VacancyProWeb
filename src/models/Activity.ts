import Place from "./Place.ts";
import Period from "./Period.ts";

export default class Activity {

    Id:number
    Name: string
    Description: string
    BeginDate: Date
    EndDate: Date
    Place: Place
    Period:Period


    constructor(id:number,name: string, desc:string, beginDate:Date,endDate:Date, place:Place , period:Period) {
        this.Id = id;
        this.Name = name
        this.Description = desc
        this.BeginDate = beginDate
        this.EndDate = endDate
        this.Place = place
        this.Period = period;
    }
}