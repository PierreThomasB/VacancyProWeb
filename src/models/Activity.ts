import User from "./User";
import Place from "./Place.ts";

export default class Activity {

    _name: string
    _desc: string
    _beginDate: Date
    _endDate: Date
    _place: Place


    constructor(name: string, desc:string, beginDate:Date,endDate:Date, place:Place) {
        this._name = name
        this._desc = desc
        this._beginDate = beginDate
        this._endDate = endDate
        this._place = place
    }
}