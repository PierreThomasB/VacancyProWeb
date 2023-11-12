import Place from "../models/Place"
import Period from "../models/Period.ts";

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


    newPeriod(period: Period){
        let data = JSON.stringify(period);
        return fetch(`${this._base}`+"api/Period/NewVacances",{
            method: 'POST',
            body: data,
            headers: {
                'Content-Type':'application/json'
            }
        }).then(re => re.json())
    }


    getPeriodByUser(){
        return fetch(`${this._base}`,{
            method: 'GET',
            headers: {
                'Content-Type':'application/json'
            }
        }).then(re => re.json())

    }

    

    async signIn(email: string, password: string): Promise<any> {
        let data = JSON.stringify({
            email: email,
            password: password
        })
        const re = await fetch(`${this._base}/api/User/SignIn`, {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return await re.json()
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
                'Access-Control-Allow-Origin': '*',
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

    sendContactForm(lastname, firstname, email, subject, message): Promise<any> {
        //TODO Faire l'envoie de mail
        return null
    }
}
export const api = new Api()