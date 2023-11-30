import User from "./User.ts";

import Place from "./Place.ts";

export default class Period {
    private readonly _id:number
    private readonly _name: string
    private readonly _description: string
    private readonly _place: Place
    private readonly _beginDate: Date
    private readonly _endDate: Date
    private readonly _creator: User
    private readonly _listUser: Array<User>;


    constructor(id:number , name: string, desc: string, place: Place, beginDate: Date, endDate: Date, creator: User , listUser : Array<User>) {
        this._id = id;
        this._name = name
        this._description = desc
        this._place = place;
        this._beginDate = new Date(beginDate);
        this._endDate =  new Date(endDate);
        this._creator = creator
        this._listUser = new Array<User>();
        if(listUser != null ) {
            listUser.forEach(user => {
                this._listUser.push(new User(user["id"], user["userName"], user["emailN"], "noThinkHere", false, null));
            })
        }
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
        return this._beginDate;
    }

    get endDate(): Date {
        return this._endDate;
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

        return list.join(",");
    }





}