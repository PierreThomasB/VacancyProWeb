export default class User {
    _name: string
    _lastname: string
    _email: string
    _token: any

    _isAdmin: boolean

    constructor(name: string, lastname: string, email: string, token: any) {
        this._name = name
        this._lastname = lastname
        this._email = email
        this._token = token
    }
}