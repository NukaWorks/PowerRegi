import Head from 'next/head'
import { AppHeader, AppActivity, Menu, MenuItem, MenuList, MenuBar, UiApp } from '@powerws/uikit'

export default function App() {
  return (
      <>
        <Head>
          <title>PowerRegii</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
        </Head>

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
      </>
  )
}
