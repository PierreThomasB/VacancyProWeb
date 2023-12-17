import User from "./User.ts";
import HasRangeDates from "./HasRangeDates.ts";
import Place from "./Place.ts";

export default class Period extends HasRangeDates{
    private readonly _id:number
    private readonly _name: string
    private readonly _description: string
    private readonly _place: Place
    private readonly _creator: User
    private readonly _listUser: Array<User>;



    constructor(id:number , name: string, desc: string, place: Place, beginDate: Date, endDate: Date, creator: User , listUser : Array<User>) {
    
        super( new Date(beginDate) , new Date(endDate));
        this._id = id;
        this._name = name
        this._description = desc
        this._place = place;
        this._creator = creator
        this._listUser = listUser;

    }


    addUser(user:User){
        this._listUser.push(user);
    }
    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get description(): string {
        return this._description;
    }

    get place(): Place {
        return this._place;
    }

    get beginDate(): Date {
        return super.beginDate;
    }

    get endDate(): Date {
        return super.endDate;
    }

    get creator(): User {
        return this._creator;
    }

    get listUser(): Array<User> {
        return this._listUser;
    }

    get userListName(){
        let list = [];
        this._listUser.forEach(user => {
            list.push(user._username);
        })

        return list.join(" , ");
    }







}