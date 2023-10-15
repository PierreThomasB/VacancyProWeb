import User from "./User";
import Place from "./Place";
import Activity from "./Activity";

export default class Period {
    _name: string
    _desc: string
    _place: Place
    _beginDate: Date
    _endDate: Date
    _creator: User

    _listUser: Set<User>
    _listActivity: Array<Activity>

    constructor(name: string, desc: string, place: Place, beginDate: Date, endDate: Date, creator: User) {
        this._name = name
        this._desc = desc
        this._place = place
        this._beginDate = beginDate
        this._endDate = endDate
        this._creator = creator

        this._listUser = new Set<User>()
        this._listActivity = new Array<Activity>()
    }
}