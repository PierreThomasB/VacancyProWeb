export default class Activity {
    _name: string
    _desc: string
    _beginDate: Date
    _endDate: Date

    constructor(name: string, desc:string, beginDate:Date,endDate:Date) {
        this._name = name
        this._desc = desc
        this._beginDate = beginDate
        this._endDate = endDate
    }
}