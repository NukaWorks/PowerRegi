import {
  AppActivity,
  AppHeader,
  Menu,
  MenuBar,
  MenuItem,
  MenuList,
  Spinner,
  UiApp
} from '@powerws/uikit'
import { commercial_name } from '../package.json'
import React, { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from './Views/HomeView/HomeView'
import ConsoleMgmt from './Views/ConsoleMgmt/ConsoleMgmt'
import ErrorView from './Views/ErrorView/ErrorView'
import ErrorTypes from './Common/Misc/ErrorTypes'
import IdmsaView from './Views/IdmsaView/IdmsaView'
import SettingsView from './Views/SettingsView/SettingsView'
import axios from 'axios'

export default function App() {
  const [loading, setLoading] = React.useState(true)
  const [loggedIn, setLoggedIn] = React.useState(false)

  useEffect(() => {
    setLoading(false)
  })

  return (
      <AppActivity theme={'Light'}>
        <AppHeader title={commercial_name}>
          <MenuBar>
            <Menu title={'File'}>
              <MenuList>
                <MenuItem>New Repository</MenuItem>
                <MenuItem>New Application</MenuItem>
                <MenuItem>New Package</MenuItem>
                <MenuItem>Settings</MenuItem>
                <MenuItem>Logout...</MenuItem>
              </MenuList>
            </Menu>

            <Menu title={'Tools'}>
              <MenuList>
                <MenuItem onClick={() => window.location = '/home'}>Go to Home View</MenuItem>
                <MenuItem onClick={() => window.location.reload()}>Refresh</MenuItem>
              </MenuList>
            </Menu>

            <Menu title={'Help'}>
              <MenuList>
                <MenuItem>Check for Updates...</MenuItem>
                <MenuItem>Documentation Center</MenuItem>
                <MenuItem>About PowerWs & UiKit</MenuItem>
                <MenuItem>About {commercial_name}</MenuItem>
              </MenuList>
            </Menu>
          </MenuBar>
        </AppHeader>

        {loading ? (
            <div className={'App__LoadingScreen'}>
              <Spinner size={'Large'} color={'Blue'}/>
            </div>
        ) : (
            <UiApp rounded>
              <BrowserRouter>
                <Routes>
                  <Route path={'/'} element={<Navigate replace to={'/home'}/>}/>
                  <Route caseSensitive path="/idmsa" element={<IdmsaView/>}/>
                  <Route
                      caseSensitive
                      path="/home"
                      element={loggedIn
                          ? <Home/>
                          : <Navigate
                              replace
                              to={`/idmsa?redirect=${encodeURIComponent(document.location.pathname)}`}
                          />}
                  />
                  <Route caseSensitive path={'/console'} element={<ConsoleMgmt/>}/>
                  <Route caseSensitive path={'/settings'} element={<SettingsView/>}/>

                  <Route path="*" element={<ErrorView errorCode={ErrorTypes['404']}/>}/>
                </Routes>
              </BrowserRouter>
            </UiApp>
        )}
      </AppActivity>
  )
}