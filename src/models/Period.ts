import User from "./User";
import Activity from "./Activity";

export default class Period {
    _name: string
    _desc: string
    _place: string
    _beginDate: Date
    _endDate: Date
    _creator: User

    _listUser: Set<User>
    _listActivity: Array<Activity>

    constructor(name: string, desc: string, place: string, beginDate: Date, endDate: Date, creator: User) {
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