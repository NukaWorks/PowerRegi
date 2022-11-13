import React from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../../Misc/AppContexts'

export default function AuthRoute({children, element}) {
  const authContext = React.useContext(AuthContext)

  if (authContext.logged) {
    return children || element
  } else {
    return (
        <Navigate
          replace
          to={`/idmsa?redirect=${encodeURIComponent(document.location.pathname)}`}
        />
    )
  }
}
