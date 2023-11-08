const config = require(`../config.json`)

class Api {
    _base: string

    constructor() {
        this._base = config.ApiUrl
    }

    get base() {
        return this._base
    }

    set base(base) {
        this._base = base
    }


    async signIn(email: string, password: string): Promise<any> {
        let data = JSON.stringify({
            email: email,
            password: password
        })
        const re = await fetch(`${this._base}/User/SignIn`, {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return await re.json()
    }

    async fetchUser(token: string): Promise<any> {
        const resp = await fetch(`${this.base}/User`, {
            headers: {
                'Authorization': `bearer ${token}`
            }
        })
        return resp.status === 401 ? ({error: true, unauthorized: true}) : resp.json()
    }

    sendContactForm(lastname, firstname, email, subject, message): Promise<any> {
        //TODO Faire l'envoie de mail
        return null
    }
}
export const api = new Api()