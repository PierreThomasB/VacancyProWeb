import {api} from "../repositories/Api.ts";

class ContactStore {
    private _errorMsg = undefined
    private _severity = 'error'
    private _open = false


    get errorMsg(): any {
        return this._errorMsg;
    }

    set errorMsg(value: string) {
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

    handleSubmit(data: any[]) {
        // @ts-ignore
        this.handleContact(...data.values())
    }

    private handleContact(firstname: string, lastname: string, email: string, subject: string, message: string) {
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

        if (email === '') {
            this.handleErrorMessage('Le champ "Adresse mail" est obligatoire');
            return
        }
        if (!email.match(emailRegex)) {
            this.handleErrorMessage('Veuillez encoder une adresse mail valide')
            return
        }
        if (lastname === '') {
            this.handleErrorMessage('Le champ "Nom de famille" est obligatoire');
            return
        }
        if (firstname === '') {
            this.handleErrorMessage('Le champ "Prénom" est obligatoire');
            return
        }

        if (subject === '') {
            this.handleErrorMessage('Le champ "Sujet" est obligatoire');
            return
        }
        if (message === '') {
            this.handleErrorMessage('Le champ "Votre message..." est obligatoire');
            return
        }
        api.sendContactForm(lastname, firstname, email, subject, message)
            .then(data => data.error ? this.handleErrorMessage(data.message) : this.handleSuccessMessage(data.message))
    }

    handleErrorMessage(message: string) {
        this.open = true
        this.severity = 'error'
        this.errorMsg = message
        setTimeout(() => {
            this.open = false
        }, 2500)
    }

    handleSuccessMessage(message: string) {
        this.open = true
        this.severity = 'success'
        this.errorMsg = message

        setTimeout(() => {
            this.open = false
        }, 2500)
    }
}
export const contactStore = new ContactStore()