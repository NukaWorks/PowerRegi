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
import ErrorView from './Views/ErrorView/ErrorView'
import ErrorTypes from './Common/Misc/ErrorTypes'
import axios from 'axios'
import { AuthContext } from './Common/Misc/AppContexts'
import Router from './Common/Modules/Router/Router'
import { DataContext } from './Common/Misc/AppContexts'
import StatusOverlay from './Common/Modules/StatusOverlay/StatusOverlay'

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
  const [data, setData] = React.useState({})

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
      <DataContext.Provider value={{ data: data }}>
        <AuthContext.Provider value={{isLogged: false}}>
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

            {applicationState.state === 'loading' ? (
                <div className={'App__LoadingScreen'}>
                  <Spinner size={'Large'} color={'Blue'}/>
                </div>
            ) : (
                <UiApp rounded>

                  {applicationState.state === 'crashed' ? (
                      <ErrorView errorCode={ErrorTypes['500']}/>
                  ) : (
                      <Router data={data}/>
                  )}
                </UiApp>
            )}

            <StatusOverlay />
          </AppActivity>
        </AuthContext.Provider>
      </DataContext.Provider>
  )
}