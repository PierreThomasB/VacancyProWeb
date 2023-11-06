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
            //this.handleErrorMessage('Le champ "Adresse mail" est obligatoire')
            return
        }
        if (!email.match(emailRegex)) {
            //this.handleErrorMessage('Veuillez encoder une adresse mail valide')
            return
        }
        if (password === '') {
            //this.handleErrorMessage('Le champ "Mot de passe" est obligatoire')
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
}

export const authentificationStore = new AuthentificationStore()