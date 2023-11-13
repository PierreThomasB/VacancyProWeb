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


    signIn(email: string, password: string): Promise<any> {
        let data = JSON.stringify({
            email: email,
            password: password
        })
        return fetch(`${this._base}/api/User/SignIn`, {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(re => re.json())
    }

    async signUp(firstname:string, lastname:string, email: string, password:string) {
        let data = JSON.stringify({
            LastName: lastname,
            FirstName: firstname,
            Email: email,
            Password: password
        })
        const re = await fetch(`${this._base}/api/User/SignUp`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: data
        })
        return await re.json();
    }

    async fetchUser(token: string): Promise<any> {
        const resp = await fetch(`${this.base}/api/User`, {
            headers: {
                'Authorization': `bearer ${token}`
            }
        })
        return resp.status === 401 ? ({error: true, unauthorized: true}) : resp.json()
    }

    async sendContactForm(lastname: string, firstname: string, email: string, subject: string, message: string): Promise<any> {
        let data = JSON.stringify({
            lastname: lastname,
            firstname: firstname,
            email: email,
            subject: subject,
            message: message
        })
        const re = await fetch(`${this._base}/api/Contact`, {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return await re.json()
    }
}
export const api = new Api()