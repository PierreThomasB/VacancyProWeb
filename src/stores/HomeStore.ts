import {makeAutoObservable} from "mobx";
import {api} from '../repositories/Api.ts'

class HomeStore {
    private _usersCount = 0


    constructor() {
        makeAutoObservable(this)
    }

    get usersCount(): number {
        return this._usersCount;
    }

    set usersCount(value: number) {
        this._usersCount = value;
    }

    init() {
        this.loadUsersCount()
    }

    loadUsersCount() {
        api.fetchUsersCount().then(data => {
            this.usersCount = data
        })
    }
}

export const homeStore = new HomeStore()