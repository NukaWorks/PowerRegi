import {
  AppActivity,
  AppHeader, VBox,
  Menu,
  MenuBar,
  MenuItem,
  MenuList, Sidebar, SidebarItem,
  Spinner,
  UiApp
} from '@powerws/uikit'
import { commercial_name } from '../package.json'
import React, { useEffect } from 'react'
import ErrorView from './Views/ErrorView/ErrorView'
import ErrorTypes from './Common/Misc/ErrorTypes'
import axios from 'axios'
import { AuthContext, StateContext, TargetContext } from './Common/Misc/AppContexts'
import AppRouter from './Common/Modules/Router/AppRouter'
import { DataContext } from './Common/Misc/AppContexts'
import StatusOverlay from './Common/Modules/StatusOverlay/StatusOverlay'
import LoadingOverlay from './Common/Modules/LoadingOverlay/LoadingOverlay'

export const AppConfig = {
  APP_HOST: window.location.hostname,
  APP_PORT: 8081,
  APP_PROTOCOL: window.location.protocol
}

export const AppEndpoints = {
  api: `${AppConfig.APP_PROTOCOL}//${AppConfig.APP_HOST}/api`,
}

export default function App() {
  // Available applicationStates: 'loading', 'crashed', 'done'.
  const [applicationState, setApplicationState] = React.useState({state: 'loading'})
  const [targetState, setTargetState] = React.useState({target: ''})
  const [data, setData] = React.useState({})
  const [logged, setLogged] = React.useState(false)

  useEffect(() => {
    axios.get(`${AppEndpoints.api}/`)
        .then(res => {
          setData(res.data)
          setApplicationState({state: 'done'})
          return data
        })
        .catch(err => {
          console.error('Backend syncing error, ' + ErrorTypes['500'])
          setApplicationState({state: 'crashed'})
        })
  }, [])

  return (
      <StateContext.Provider value={{applicationState, setApplicationState}}>
        <TargetContext.Provider value={{targetState, setTargetState}}>
          <DataContext.Provider value={{data, setData}}>
            <AuthContext.Provider value={{logged, setLogged}}>
              <AppActivity theme={'Light'}>
                <AppHeader title={commercial_name}>
                  <MenuBar>
                    <Menu title={'File'}>
                      <MenuList>
                        <MenuItem>New Repository</MenuItem>
                        <MenuItem>New Application</MenuItem>
                        <MenuItem>New Package</MenuItem>
                        <MenuItem>Settings</MenuItem>
                        <MenuItem
                            disabled={logged}
                            onClick={() => window.location = `/idmsa?logout=true&redirect=${encodeURIComponent(document.location.pathname)}`}>
                          Logout...
                        </MenuItem>
                      </MenuList>
                    </Menu>

                    <Menu title={'Tools'}>
                      <MenuList>
                        <MenuItem onClick={() => window.location = '/home'}>Go to Home
                          View</MenuItem>
                        <MenuItem onClick={() => window.location.reload()}>Reload</MenuItem>
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
                {applicationState.state === 'loading' ? (
                    <LoadingOverlay />
                ) : (
                    <VBox>
                      {applicationState.state !== 'crashed' ? (
                          <Sidebar>
                            <SidebarItem icon={'home'} text={'Home'}
                                         active={targetState.target === '/home'}
                                         onClick={() => setTargetState({target: '/home'})}/>
                            <SidebarItem icon={'inventory_2'} text={'Packages'}
                                         active={targetState.target === '/console/packages'}
                                         onClick={() => setTargetState({target: '/console/packages'})}/>
                            <SidebarItem icon={'terminal'} text={'Console Management'}
                                         active={targetState.target === '/console'}
                                         onClick={() => setTargetState({target: '/console'})}/>
                            <SidebarItem icon={'settings'} text={'Settings'}
                                         active={targetState.target === '/settings'}
                                         onClick={() => setTargetState({target: '/settings'})}/>
                            <SidebarItem icon={'info'} text={'About'}
                                         active={targetState.target === '/settings/about'}
                                         onClick={() => setTargetState({target: '/settings/about'})}/>
                          </Sidebar>
                      ) : <></>}

                      <UiApp rounded>
                        {applicationState.state === 'crashed' ? (
                                <ErrorView errorCode={ErrorTypes['500']}/>)
                            : (<></>)}
                        <AppRouter data={data}/>
                      </UiApp>
                    </VBox>
                )}
                <StatusOverlay/>
              </AppActivity>
            </AuthContext.Provider>
          </DataContext.Provider>
        </TargetContext.Provider>
      </StateContext.Provider>
  )
}