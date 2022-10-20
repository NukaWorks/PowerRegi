import { AppActivity, AppHeader, Menu, MenuBar, MenuItem, MenuList, UiApp } from '@powerws/uikit'
import { commercial_name } from '../package.json'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Views/Overview/HomeView'
import ConsoleMgmt from './Views/ConsoleMgmt/ConsoleMgmt'
import ErrorView from './Views/ErrorView/ErrorView'
import ErrorTypes from './Common/Misc/ErrorTypes'
import { useNavigate } from 'react-router-dom'

export default function App() {
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

        <UiApp rounded>
          <BrowserRouter>
            <Routes>
              <Route caseSensitive path="/home" element={<Home/>}/>
              <Route caseSensitive path={'/console'} element={<ConsoleMgmt/>}/>
              <Route path="*" element={<ErrorView errorCode={ErrorTypes['404']}/>}/>
            </Routes>
          </BrowserRouter>
        </UiApp>
      </AppActivity>
  )
}