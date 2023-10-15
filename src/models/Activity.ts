import Place from "./Place";
import User from "./User";

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