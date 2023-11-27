import Period from "./Period";

export default class User {
    _id:string
    _username: string
    _email: string
    _token: string

    _isAdmin: boolean
    _period : [Period]

    constructor(id:string,username: string, email: string, token: string, isAdmin:boolean,period : [Period]) {
        this._id = id;
        this._username = username
        this._email = email
        this._token = token
        this._isAdmin = isAdmin
        this._period = period
    }

    set username(username: string) {
        this._username = username
    }

    get username() {
        return this._username
    }

    get lastname() {
        let index = this._username.search(' ')
        return this.username.substring(index + 1, this._username.length)
    }

    get firstname() {
        let index = this._username.search(' ')
        return this.username.substring(0, index)
    }

    set email(email: string) {
        this._email = email
    }

    get email() {
        return this._email
    }

    set token(token) {
        this._token = token
    }

    get token() {
        return this._token
    }

    get isAdmin() {
        return this._isAdmin
    }

    set isAdmin(isAdmin) {
        this._isAdmin = isAdmin
    }
}