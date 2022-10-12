import {AppActivity, AppHeader, Menu, MenuBar, MenuItem, MenuList, UiApp} from "../../../PowerOS/PowerWorkspace/UiKit";
import { commercial_name } from "../package.json"
import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Overview from './Views/Overview/Overview'


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
                <MenuItem>Refresh</MenuItem>
              </MenuList>
            </Menu>

            <Menu title={'Help'}>
              <MenuList>
                <MenuItem>Check for Updates...</MenuItem>
                <MenuItem>Documentation Center</MenuItem>
                <MenuItem>About PowerWs & UiKit</MenuItem>
                <MenuItem>About</MenuItem>
              </MenuList>
            </Menu>
          </MenuBar>
        </AppHeader>

        <UiApp className={"App--MainView"}>
          <BrowserRouter>
            <Routes>
              <Route path="/home" element={<Overview />} />
            </Routes>
          </BrowserRouter>
        </UiApp>
      </AppActivity>
  )
}