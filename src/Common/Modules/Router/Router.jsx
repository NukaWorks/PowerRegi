import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthContext } from '../../Misc/AppContexts'
import Home from '../../../Views/HomeView/HomeView'
import IdmsaView from '../../../Views/IdmsaView/IdmsaView'
import ConsoleMgmt from '../../../Views/ConsoleMgmt/ConsoleMgmt'
import SettingsView from '../../../Views/SettingsView/SettingsView'
import ErrorView from '../../../Views/ErrorView/ErrorView'
import ErrorTypes from '../../Misc/ErrorTypes'
import AuthRoute from '../../Misc/AuthRoute'

export default function Router() {
  const authContext = React.useContext(AuthContext)

  return (
      <BrowserRouter>
        <>
        <Routes>
          <Route path={'/'} element={<Navigate replace to={'/home'}/>}/>
          <Route path={'/home'} element={
            <AuthRoute>
              <Home />
            </AuthRoute>
          }/>
          <Route caseSensitive path={'/idmsa'} element={<IdmsaView />}/>
          <Route caseSensitive path={'/console'} element={<ConsoleMgmt/>}/>
          <Route caseSensitive path={'/settings'} element={<SettingsView/>}/>

          <Route path="*" element={<ErrorView errorCode={ErrorTypes['404']}/>}/>
        </Routes>
        </>
      </BrowserRouter>
  )
}