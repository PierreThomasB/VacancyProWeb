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
        this.loadUsersCountInVacation(date)
    }

    async loadUsersCount(){
        try {
            this.usersCount = await api.fetchUsersCount()
        } catch (e) {
            console.log(e)
        }
    }

    async loadUsersCountInVacation(date: any) {
        try {
            let data = await api.fetchUsersCountInVacation(date)
            this.userCountPerPlace = new Map<string, string>(Object.entries(data))
        } catch (e) {
            console.log(e)
        }
    }
}

export const homeStore = new HomeStore()