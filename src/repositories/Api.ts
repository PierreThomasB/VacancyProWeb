import config from '../config.json'

class Api {
    _base

    constructor() {
        this._base = config.ApiUrl
    }
}