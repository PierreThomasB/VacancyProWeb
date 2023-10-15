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


    signIn(email: string, password: string) {
        let data = JSON.stringify({
            email: email,
            password: password
        })
        return fetch(`${this._base}/User/SignIn`,{
            method: 'POST',
            body: data,
            headers: {
                'Content-Type':'application/json'
            }
        }).then(re => re.json())
    }
}