import React from 'react'

const AuthContext = React.createContext({ isLogged: false })
const DataContext = React.createContext({ data: {} })

export { AuthContext, DataContext }