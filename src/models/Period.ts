import User from "./User";
import Activity from "./Activity";
import Place from "./Place.ts";
import {List} from "@mui/material";

export default class Period {
    _id:number
    _name: string
    _description: string
    _place: Place
    _beginDate: Date
    _endDate: Date
    _creator: User
    _listUser: Array<User>;


    constructor(id:number , name: string, desc: string, place: Place, beginDate: Date, endDate: Date, creator: User) {
        this._id = id;
        this._name = name
        this._description = desc
        this._place = place;
        this._beginDate = new Date(beginDate);
        this._endDate =  new Date(endDate);
        this._creator = creator
        this._listUser = new Array<User>();
        this._listUser.push(creator);
    }





}