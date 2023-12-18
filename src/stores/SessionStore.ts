import {makeAutoObservable} from 'mobx'
import User from "../models/User.ts";
import {api} from '../repositories/Api.ts'

class SessionStore {
    private _user: User = undefined

    constructor() {
        makeAutoObservable(this)
        this.loadUser()
    }

    get user() {
        return this._user
    }

    set user(data:any) {
        if (data) {

            this._user = new User(data.id,data.username, data.email, data.token, data.isAdmin, data.periods)
            this.saveUser()
        }
    }

    async loadUser() {
        let token = JSON.parse(localStorage.getItem('VacancyProUser'))
        if (token) {
            try {
                let data = await api.fetchUser(token)
                this.user = data
            }catch (e) {
                console.log(e)
            }
        }
    }

    private saveUser() {
        let token = JSON.stringify(this.user.token)
        localStorage.setItem('VacancyProUser', token)
    }

    logout() {
        this._user = undefined
        localStorage.removeItem('VacancyProUser')
        window.location.reload()
    }
}

export const sessionStore = new SessionStore()