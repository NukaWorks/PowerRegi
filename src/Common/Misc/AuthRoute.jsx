import React from 'react'
import Home from '../../Views/HomeView/HomeView'
import { Navigate, Route } from 'react-router-dom'
import { AuthContext } from './AppContexts'

export default function AuthRoute({children}) {
  const authContext = React.useContext(AuthContext)

  if (authContext.logged) {
    return children
  } else {
    return (
        <Navigate
          replace
          to={`/idmsa?redirect=${encodeURIComponent(document.location.pathname)}`}
        />
    )
  }
}
