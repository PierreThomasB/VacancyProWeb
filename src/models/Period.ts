import User from "./User.ts";

import Place from "./Place.ts";

export default class Period {
    id:number
    name: string
    description: string
    place: Place
    beginDate: Date
    endDate: Date
    creator: User
    listUser: Array<User>;


    constructor(id:number , name: string, desc: string, place: Place, beginDate: Date, endDate: Date, creator: User , listUser : Array<User>) {
        this.id = id;
        this.name = name
        this.description = desc
        this.place = place;
        this.beginDate = new Date(beginDate);
        this.endDate =  new Date(endDate);
        this.creator = creator
        this.listUser = new Array<User>();
        listUser.forEach(user => {
            this.listUser.push(new User(user["id"],user["userName"],user["email"],"noThinkHere",false,null));
        })
    }



    get userListName(){

        console.log(this.listUser);
        let list = [];
        this.listUser.forEach(user => {
            list.push(user._username);
        })

        return list.join(",");
    }





}