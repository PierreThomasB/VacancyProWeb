import {makeAutoObservable} from "mobx";
class NavigationStore {
    _open = false
    _message = ''
    _severity = 'error'
    private _element = null
    private _menu = 'menu'
    constructor() {
        makeAutoObservable(this)
    }


    get menu(): string {
        return this._menu;
    }

    set menu(value: string) {
        this._menu = value;
    }

    get element(): any {
        return this._element;
    }

    set element(value: any) {
        this._element = value;
    }

    handleOpenMenu(target) {
        this.element = target
    }

    handleCloseMenu() {
        this.element = null
    }

    handleDisplayMenu(menu: HTMLElement) {
        this.menu = 'menu active'
        menu.className = this.menu
    }

    handleHideMenu(menu: HTMLElement) {
        this.menu = 'menu'
        menu.className = this.menu
    }
}
export const navigationStore = new NavigationStore()