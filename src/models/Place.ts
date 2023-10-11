export default class Place {
    private readonly _street: string
    _postalCode: number
    _number: number
    _locality: string
    _country: string

    constructor(street: string, postalCode: number, number: number, locality: string, country: string) {
        this._street = street
        this._postalCode = postalCode
        this._number = number
        this._locality = locality
        this._country = country
    }

    get content(): string {
        return `${this._street} ${this._number}, ${this._postalCode} ${this._locality}`
    }
}