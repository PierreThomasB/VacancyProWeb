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
        this.Place = place
        this.BeginDate = beginDate
        this.EndDate = endDate
        this.Creator = creator

        this.ListUser = new Set<User>()
        this.ListActivity = new Array<Activity>()
    }

}