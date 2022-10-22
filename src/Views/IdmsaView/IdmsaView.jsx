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
          <h1 className={'App__IdmsaView--IdmsaUi__Title'}>Hi ! 👋</h1>
          <TextField type={'text'} placeholder={'Username'} />
          <TextField type={'password'} placeholder={'Password'} />
          <Link href={'#'}>I forgot</Link>
          <Button>Login</Button>
        </div>
      </>
  )
}