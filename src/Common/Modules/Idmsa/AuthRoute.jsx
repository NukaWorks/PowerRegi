import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { AuthContext, TargetContext } from '../../Misc/AppContexts'

export default function AuthRoute({children, element}) {
  const authContext = React.useContext(AuthContext)
  const {targetState, setTargetState} = React.useContext(TargetContext)

  const navigate = useNavigate()

  useEffect(() => {
    if (window.location.pathname !== targetState.target) {
      navigate(targetState.target)
      setTargetState({target: window.location.pathname})
    }
  }, [targetState.target])

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

