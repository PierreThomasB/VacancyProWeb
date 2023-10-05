export default class User {
    _username
    _email
    _token

    _isAdmin

    constructor(username, email, token) {
        this._username = username
        this._email = email
        this._token = token
    }
}