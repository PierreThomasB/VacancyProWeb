import User from "./User";
import Activity from "./Activity";

export default class Period {
    Name: string
    Description: string
    Place: string
    BeginDate: Date
    EndDate: Date
    Creator: User

    ListUser: Set<User>
    ListActivity: Array<Activity>

    constructor(name: string, desc: string, place: string, beginDate: Date, endDate: Date, creator: User) {
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