import User from "./User";
import Activity from "./Activity";
import Place from "./Place.ts";
import {List} from "@mui/material";

export default class Period {
    Id:number
    Name: string
    Description: string
    Place: Place
    BeginDate: Date
    EndDate: Date
    Creator: User
    ListUser: Array<User>;


    constructor(id:number , name: string, desc: string, place: Place, beginDate: Date, endDate: Date, creator: User) {
        this.Id = id;
        this.Name = name
        this.Description = desc
        this.Place = place;
        this.BeginDate = new Date(beginDate);
        this.EndDate =  new Date(endDate);
        this.Creator = creator
        this.ListUser = new Array<User>();
        this.ListUser.push(creator);
    }





}