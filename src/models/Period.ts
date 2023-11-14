import User from "./User";
import Activity from "./Activity";
import Place from "./Place.ts";

export default class Period {
    Id:number
    Name: string
    Description: string
    Place: Place
    BeginDate: Date
    EndDate: Date
    Creator: User

    ListUser: Set<User>
    ListActivity: Array<Activity>

    constructor(id:number , name: string, desc: string, place: Place, beginDate: Date, endDate: Date, creator: User) {
        this.Id = id;
        this.Name = name
        this.Description = desc
        this.Place = place;
        this.BeginDate = new Date(beginDate);
        this.EndDate =  new Date(endDate);
        this.Creator = creator

        this.ListUser = new Set<User>()
        this.ListActivity = new Array<Activity>()
    }



    get jourMoisDebut(){
        return this.BeginDate.getDate()+"/"+this.BeginDate.getMonth()+"/"+this.BeginDate.getFullYear();
    }

    get jourMoisFin(){
        return this.EndDate.getDate()+"/"+this.EndDate.getMonth()+"/"+this.EndDate.getFullYear();
    }

}