import {AppActivity, AppHeader, Menu, MenuBar, MenuItem, MenuList, UiApp} from "../../../PowerOS/PowerWorkspace/UiKit";
import React from "react";


export default function App() {
  return (
      <AppActivity theme={'Light'}>
        <AppHeader title={'PowerRegi'}>
          <MenuBar>
            <Menu title={'Actions'}>
              <MenuList>
                <MenuItem>Create Repository...</MenuItem>
                <MenuItem>Create Application...</MenuItem>
              </MenuList>
            </Menu>

            <Menu title={'Help'}>
              <MenuList>
                <MenuItem>Check for Updates...</MenuItem>
                <MenuItem>About</MenuItem>
              </MenuList>
            </Menu>
          </MenuBar>
        </AppHeader>

        <UiApp>
          Hello World !
        </UiApp>
      </AppActivity>
  )
}