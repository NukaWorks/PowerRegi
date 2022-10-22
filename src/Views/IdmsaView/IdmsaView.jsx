import React from 'react'
import './IdmsaView.scss'
import { Button, Link, TextField } from '@powerws/uikit'

export default function IdmsaView() {
  return (
      <>
        <div className={'Dynamic__Header'}>
          <h1>Login</h1>
        </div>

        <div className={'Dynamic__Content App__IdmsaView'}>
          <div className={'App__IdmsaView--IdmsaUi'}>
            <div className={'App__IdmsaView--IdmsaUi__Header'}>
              <h1 className={'App__IdmsaView--IdmsaUi__Header--Title'}>Hi ! 👋</h1>
            </div>

            <div className={'App__IdmsaView--IdmsaUi__Fields'}>
              <TextField type={'text'} placeholder={'Username'}/>
              <TextField type={'password'} placeholder={'Password'}/>
            </div>

            <div className={'App__IdmsaView--IdmsaUi__Controls'}>
              <Link href={'#'}>I forgot my account</Link>
              <Button color={'Primary'}>Login</Button>
            </div>
          </div>
        </div>
      </>
  )
}