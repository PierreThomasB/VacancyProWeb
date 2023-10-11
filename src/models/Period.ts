import User from "./User";
import Place from "./Place";

export default class Period {
    _name: string
    _desc: string
    _place: Place
    _beginDate: Date
    _endDate: Date

    private readonly _creator: User
    _listUser: Array<User>

    constructor(name: string, desc: string, place: Place, beginDate: Date, endDate: Date, creator: User) {
        this._name = name
        this._desc = desc
        this._place = place
        this._beginDate = beginDate
        this._endDate = endDate
        this._creator = creator
        this._listUser = new Array<User>()
    }
}