import {makeAutoObservable} from 'mobx'
import User from "../models/User.ts";
import {api} from '../repositories/Api.ts'

class SessionStore {
    _user: User = undefined

    constructor() {
        makeAutoObservable(this)
        this.loadUser()
    }

    get user() {
        return this._user
    }

    set user(data) {
        if (data) {
            this._user = new User(data.username, data.email, data.token, data.isAdmin)
            this.saveUser()
        }
    }

    loadUser() {
        let token = JSON.parse(localStorage.getItem('VacancyProUser'))
        if (token) {
            api.fetchUser(token)
                .then(data => {
                    if (!data.error) this.user = data
                })
        }
    }

    saveUser() {
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