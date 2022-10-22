import React from 'react'
import './IdmsaView.scss'
import { Button } from '@powerws/uikit'

export default function IdmsaView() {
  return (
      <>
        <div className={'Dynamic__Header'}>
          <h1>Loading</h1>
        </div>

        <div className={'Dynamic__Content App__IdmsaView'}>
          <Button>Click me</Button>
        </div>
      </>
  )
}