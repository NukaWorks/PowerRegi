import Head from 'next/head'
import { AppHeader, Menu, MenuItem, MenuList, MenuBar, UiApp } from '@powerws/uikit'

export default function App() {
  return (
      <>
        <Head>
          <title>PowerRegii</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
        </Head>

        <UiApp theme={'light'}>
          <AppHeader title={'PowerRegii'}>
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
        </UiApp>

      </>
  )
}
