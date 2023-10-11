const config = require(`../config.json`)

class Api {
    _base: string

    constructor() {
        this._base = config.ApiUrl
    }
}