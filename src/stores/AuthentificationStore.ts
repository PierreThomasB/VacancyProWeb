import {makeAutoObservable} from "mobx";
import {sessionStore} from "./SessionStore.ts";
import {api} from '../repositories/Api.ts'

class AuthentificationStore {
    private _mode = 'signin'
    private _errorMsg = undefined
    private _severity = 'error'
    private _open = false

    constructor() {
        makeAutoObservable(this)
    }


    get mode(): string {
        return this._mode;
    }

    set mode(value: string) {
        this._mode = value;
    }


    get errorMsg(): any {
        return this._errorMsg;
    }

    set errorMsg(value: any) {
        this._errorMsg = value;
    }

    get severity(): string {
        return this._severity;
    }

    set severity(value: string) {
        this._severity = value;
    }

    get open(): boolean {
        return this._open;
    }

    set open(value: boolean) {
        this._open = value;
    }

    onModeChange(mode: string) {
        this.mode = mode
    }

    handleSubmit(data: any[]) {
        switch (data.length) {
            case 2:
                this.handleSignIn(...data.values())
                break

        }
    }

    handleSignIn(email: string, password: string) {
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        if (email === '') {
            this.handleErrorMessage('Le champ "Adresse mail" est obligatoire')
            return
        }
        if (!email.match(emailRegex)) {
            this.handleErrorMessage('Veuillez encoder une adresse mail valide')
            return
        }
        if (password === '') {
            this.handleErrorMessage('Le champ "Mot de passe" est obligatoire')
            return
        }

        api.signIn(email, password)
            .then(data => {
                if (data.error) this.handleErrorMessage(data.message)
                else {
                    sessionStore.user = data
                    this.onModeChange('signin')
                }
            })
    }

    handleErrorMessage(message: string) {
        this.open = true
        this.errorMsg = message

        setTimeout(() => {
            this.open = false
        }, 2500)

    }
}

export const authentificationStore = new AuthentificationStore()