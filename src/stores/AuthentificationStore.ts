import {makeAutoObservable} from "mobx";
import {sessionStore} from "./SessionStore.ts";
import {api} from '../repositories/Api.ts'

class AuthentificationStore {
    private _mode = 'signin'
    private _errorMsg = undefined
    private _severity = 'error'
    private _open = false
    private _emailProvider = undefined;

    constructor() {
        makeAutoObservable(this)
    }


    get emailProvider(): any {
        return this._emailProvider;
    }

    set emailProvider(value: any) {
        this._emailProvider = value;
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
                // @ts-ignore
                return this.handleSignIn(...data.values())

            case 3:
                // @ts-ignore
                this.handleSignUpProvider(...data.values())
                break
            case 5:
                // @ts-ignore
                this.handleSignUp(...data.values())
                break


        }
    }

   private  handleSignIn(email: string, password: string) {
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        if (email === '') {
            this.handleErrorMessage('Le champ "Adresse mail" est obligatoire')
            return false
        }
        if (!email.match(emailRegex)) {
            this.handleErrorMessage('Veuillez encoder une adresse mail valide')
            return false
        }
        if (password === '') {
            this.handleErrorMessage('Le champ "Mot de passe" est obligatoire')
            return false
        }

        try {
              api.signIn(email, password)
                .then(data => {
                    if (data.error) this.handleErrorMessage(data.message)
                    else {
                        sessionStore.user = data
                        this.onModeChange('signin')
                        return true;
                    }
                })
        }catch (e) {
            this.handleErrorMessage(e)
        }
    }


    handleErrorMessage(message: string) {
        this.open = true
        this.errorMsg = message

        setTimeout(() => {
            this.open = false
        }, 2500)

    }

    private handleSignUpProvider(firstname: string, lastname: string, email: string) {

        if (lastname === '') {
            this.handleErrorMessage('Le champ "Nom de famille" est obligatoire')
            return
        }
        if (firstname === '') {
            this.handleErrorMessage('Le champ "Prénom" est obligatoire')
            return
        }
        api.signUpProvider(firstname, lastname, email)
            .then(data => data.error ? this.handleErrorMessage(data.message) : this.handleSignInProvider(email))
    }

    private handleSignUp(firstname: string, lastname: string, email: string, password: string, confirm: string) {
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        if (email === '') {
            this.handleErrorMessage('Le champ "Adresse mail" est obligatoire')
            return false
        }
        if (!email.match(emailRegex)) {
            this.handleErrorMessage('Veuillez encoder une adresse mail valide')
            return false
        }
        if (lastname === '') {
            this.handleErrorMessage('Le champ "Nom de famille" est obligatoire')
            return
        }
        if (firstname === '') {
            this.handleErrorMessage('Le champ "Prénom" est obligatoire')
            return
        }


        if (password === '') {
            this.handleErrorMessage('Le champ "Mot de passe" est obligatoire')
            return
        }
        if (confirm === '') {
            this.handleErrorMessage('Le champ "Confirmation du mot de passe" est obligatoire')
            return
        }
        if (password !== confirm) {
            this.handleErrorMessage('Le mot de passe et sa confirmation doivent être identique')
            return
        }
        api.signUp(firstname, lastname, email, password)
            .then(data => data.error ? this.handleErrorMessage(data.message) : this.handleSignIn(email, password))
    }

    onSuccess(response: any) {
        api.handleProvider(response.credential)
            .then(data => {
                if (data.error) {
                    this.onModeChange('provider')
                    this.emailProvider = data.message
                } else sessionStore.user = data
            })
    }

    onError() {
        this.handleErrorMessage('Authentification externe échouée')
    }


    private handleSignInProvider(email: string) {
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        if (email === '') {
            this.handleErrorMessage('Le champ "Adresse mail" est obligatoire')
            return false
        }
        if (!email.match(emailRegex)) {
            this.handleErrorMessage('Veuillez encoder une adresse mail valide')
            return false
        }
        api.signInProvider(email)
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