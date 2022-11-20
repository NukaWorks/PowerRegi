import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthContext } from '../../Misc/AppContexts'
import Home from '../../../Views/HomeView/HomeView'
import IdmsaView from '../../../Views/IdmsaView/IdmsaView'
import ConsoleMgmt from '../../../Views/ConsoleMgmt/ConsoleMgmt'
import SettingsView from '../../../Views/SettingsView/SettingsView'
import ErrorView from '../../../Views/ErrorView/ErrorView'
import ErrorTypes from '../../Misc/ErrorTypes'
import AuthRoute from '../Idmsa/AuthRoute'

export default function AppRouter() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<Navigate replace to={'/home'}/>}/>

          {/* Protected routes by Idmsa */}
          <Route caseSensitive path={'/home'} element={
            <AuthRoute element={<Home/>}/>
          }/>

          <Route caseSensitive path={'/console'} element={
            <AuthRoute element={<ConsoleMgmt/>}/>
          }/>

          <Route caseSensitive path={'/settings'} element={
            <AuthRoute element={<SettingsView/>}/>
          }/>

          <Route caseSensitive path={'/idmsa'} element={<IdmsaView/>}/>
          <Route path="*" element={
            <AuthRoute enforceAuth element={<ErrorView errorCode={ErrorTypes['404']}/>}/>
          }/>
        </Routes>
      </BrowserRouter>
  )
}