import React from 'react'
import EmptyDataBtn from '../../Common/Modules/EmptyDataBtn/EmptyDataBtn'

export default function Overview() {
  return (
    <>
      <div className={'Dynamic--Header'}>
        <h1>Overview</h1>
      </div>

      <div className={'Dynamic--Content'} style={{justifyContent: 'center', alignItems: 'center'}}>
        <EmptyDataBtn />
      </div>
    </>
  )
}