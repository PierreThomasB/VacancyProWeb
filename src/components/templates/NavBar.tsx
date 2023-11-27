
import {sessionStore} from "../../stores/SessionStore.ts";
import NavButton from "../molecules/NavButton.tsx"
import DisplayUserInfos from "../organisms/DisplayUserInfos.tsx";
import {navigationStore} from "../../stores/NavigationStore.ts";
import DisplayUserInfo from "../molecules/DisplayUserInfo.tsx";
import {observer} from 'mobx-react'
import * as React from "react";
import TitleNavButton from "../molecules/TitleNavButton.tsx";
import {Close, Menu} from "@mui/icons-material";

function NavBar() {
    const routes = require('../../routes.json')

    const showMenu = () => {
        let menu = document.getElementById('menu')
        navigationStore.handleDisplayMenu(menu)
    }

    const hideMenu = () => {
        let menu = document.getElementById('menu')
        navigationStore.handleHideMenu(menu)
    }
    const isConnected = () => {
      return sessionStore.user ?
          <DisplayUserInfos handleMenu={(e) => navigationStore.handleOpenMenu(e.currentTarget)}
                            handleClose={() => navigationStore.handleCloseMenu()}
                            anchorEl={navigationStore.element}
                            label={`Bonjour, ${sessionStore.user.username}`}
                            inputs={[isAdmin()]} />
          :
          <NavButton route={routes.Authentication} label={'SE CONNECTER'} onClick={undefined}/>

    }
    
    const isAdmin = () => {
      return sessionStore.user._isAdmin ?
          [
              <DisplayUserInfo onClick={() => sessionStore.logout()}
                                   onReset={() => navigationStore.handleCloseMenu()}
                                   label={'Se déconnecter'} route={false}/>
          ]
          :
          [
              <DisplayUserInfo onClick={() => sessionStore.logout()}
                               onReset={() => navigationStore.handleCloseMenu()}
                               label={'Se déconnecter'} route={false}/>
          ]
    }

    const displayMenu = () => {
      return (
          <div className={navigationStore.menu} id={'menu'}>
              <Close className={'close'} onClick={() => hideMenu()}/>
              <ul>
                  <NavButton route={routes.Home} label={'ACCUEIL'} onClick={() => hideMenu()}/>
                  <NavButton route={routes.About} label={'A PROPOS'} onClick={() => hideMenu()}/>
                  <NavButton route={routes.Contact} label={'CONTACT'} onClick={() => hideMenu()}/>
                  {sessionStore.user && <NavButton route={routes.Periods} label={'MES PERIODES'} onClick={() => hideMenu()}/>}
              </ul>
          </div>
      )
    }

    return (
        <nav className={'navbar'}>
            <ul className={'left'}>
                <Menu className={'open'} onClick={() => showMenu()} />
            </ul>
            <ul className={'center'}>
                <TitleNavButton route={routes.Home} label={'Vacancy Pro'}/>
            </ul>
            <ul className={'right'}>
                {isConnected()}
            </ul>
            {displayMenu()}
        </nav>
    )
    
}
export const ObservedNavBar = observer(NavBar)