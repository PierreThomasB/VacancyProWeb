import {makeAutoObservable} from "mobx";
import {api} from '../repositories/Api.ts'

class HomeStore {
    private _usersCount = 0
    private _userCountPerPlace : Map<string, string> = new Map<string, string>()


    constructor() {
        makeAutoObservable(this)
    }

    get usersCount(): number {
        return this._usersCount;
    }

    set usersCount(value: number) {
        this._usersCount = value;
    }

    get userCountPerPlace(): Map<string, string> {
        return this._userCountPerPlace;
    }

    set userCountPerPlace(value: Map<string, string>) {
        this._userCountPerPlace = value;
    }

    init(date: any) {
        this.loadUsersCount()
        //this.loadUsersCountInVacation(date)
    }

    loadUsersCount() {
        api.fetchUsersCount().then(data => {
            this.usersCount = data
        })
    }

    loadUsersCountInVacation(date: any) {
        api.fetchUsersCountInVacation(date).then(data => {
            this.userCountPerPlace = new Map<string, string>(Object.entries(data))
        })
    }
}

export const homeStore = new HomeStore()