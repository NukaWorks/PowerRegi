import React from 'react'
import { Spinner } from '@powerws/uikit'

export default function LoadingOverlay() {
  return (
      <div className={'App__LoadingScreen'}>
        <Spinner size={'Large'} color={'Blue'}/>
      </div>
  )
}