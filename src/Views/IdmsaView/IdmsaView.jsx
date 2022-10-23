import React from 'react'
import './IdmsaView.scss'
import { Button, Link, TextField } from '@powerws/uikit'
import { commercial_name, version } from '../../../package.json'
export default function IdmsaView() {
  return (
      <>
        <div className={'Dynamic__Header'}>
          <h1>Login to PowerRegi</h1>
        </div>

        <div className={'Dynamic__Content App__IdmsaView'}>
          <div className={'App__IdmsaView--IdmsaUi'}>
            <div className={'App__IdmsaView--IdmsaUi__Header'}>
              <h1 className={'App__IdmsaView--IdmsaUi__Header--Title'}>Hi ! 👋</h1>
              <span className={'App__IdmsaView--IdmsaUi__Header--HelpIcon'}>?</span>
            </div>

            <div className={'App__IdmsaView--IdmsaUi__Content'}>
              <h3 className={'App__IdmsaView--IdmsaUi__Content--Title'}>Login</h3>
              <div className={'App__IdmsaView--IdmsaUi__Content--Fields'}>
                <TextField
                    className={'App__IdmsaView--IdmsaUi__Content--Fields__Field'}
                    type={'text'}
                    placeholder={'Username'}
                />

                <TextField
                    className={'App__IdmsaView--IdmsaUi__Content--Fields__Field'}
                    type={'password'}
                    placeholder={'Password'}
                />
              </div>

              <div className={'App__IdmsaView--IdmsaUi__Content--Controls'}>
                <Link href={'#'}>I forgot my account</Link>
                <Button color={'Primary'}>Login</Button>
              </div>
            </div>

            <div className={'App__IdmsaView--IdmsaUi__Footer'}>
              <p className={'App__IdmsaView--IdmsaUi__Footer--InstanceLocation'}>
                <code>regi.nuka.works</code>
              </p>

              <p className={'App__IdmsaView--IdmsaUi__Footer--AppVersion'}>
                <code>{ commercial_name } { version }</code>
              </p>
            </div>
          </div>
        </div>
      </>
  )
}