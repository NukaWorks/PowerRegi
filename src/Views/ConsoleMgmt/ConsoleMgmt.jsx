import React from 'react'
import { NavLink } from 'react-router-dom'

export default function ConsoleMgmt () {
  return (
      <>
        <div className={'Dynamic--Header App__ConsoleMgmt'}>
          <h1>Console Management</h1>
        </div>

        <div className={'Dynamic--Content App__ConsoleMgmt'}>
          <p>Console Management</p>
          <NavLink to={'/idmsa?logout=true&redirect=/console'}>Logout</NavLink>
        </div>
      </>
  )
}