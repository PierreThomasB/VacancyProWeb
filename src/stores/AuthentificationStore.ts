import {makeAutoObservable} from "mobx";
import {sessionStore} from "./SessionStore";
import {api} from '../repositories/Api'

class AuthentificationStore {
    private _mode = 'signin'
    _errorMsg = undefined
    _severity = 'error'

    constructor() {
        makeAutoObservable(this)
    }


    get mode(): string {
        return this._mode;
    }

    set mode(value: string) {
        this._mode = value;
    }

    onModeChange(mode: string) {
        this.mode = mode
    }
}

export const authentificationStore = new AuthentificationStore()