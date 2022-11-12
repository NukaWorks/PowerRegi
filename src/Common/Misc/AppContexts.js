import React from 'react'

const AuthContext = React.createContext({ isLogged: false })
const DataContext = React.createContext({ data: {} })
const StateContext = React.createContext({ state: {} })

export { AuthContext, DataContext, StateContext }