import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { AuthContext, StateContext, TargetContext } from '../../Misc/AppContexts'

export default function AuthRoute({children, element, enforceAuth}) {
  const authContext = React.useContext(AuthContext)
  const {targetState, setTargetState} = React.useContext(TargetContext)
  const {applicationState, setApplicationState} = React.useContext(StateContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (window.location.pathname !== targetState.target) {
      if (targetState.target === '/') {
        setTargetState({target: '/home'})
      } else {
        navigate(targetState.target)
        setTargetState({target: window.location.pathname})
      }
    }
  }, [targetState.target])

  if (authContext.logged || enforceAuth) {
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

