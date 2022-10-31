import React, { createRef, useEffect } from 'react'
import './IdmsaView.scss'
import { Button, Link, Menu, MenuItem, MenuList, TextField } from '@powerws/uikit'
import { commercial_name, version } from '../../../package.json'

export default function IdmsaView() {
  const [formDisabled, setFormDisabled] = React.useState(true)
  const fldUsername = createRef()
  const fldPassword = createRef()

  useEffect(() => {
    fldUsername.current.addEventListener('input', e => {
      if ((e.target.value.length > 0)) {
        setFormDisabled(false)
      } else {
        setFormDisabled(true)
      }
    })
  }, [])

  return (
      <>
        <div className={'Dynamic__Header'}>
          <h1>Login to PowerRegi</h1>
        </div>

        <div className={'Dynamic__Content App__IdmsaView'}>
          <div className={'App__IdmsaView--IdmsaUi'}>
            <div className={'App__IdmsaView--IdmsaUi__Header'}>
              <h1 className={'App__IdmsaView--IdmsaUi__Header--Title'}>Hi ! 👋</h1>
              <Menu className={'App__IdmsaView--IdmsaUi__Header--HelpIcon'} title={
                <span className="material-symbols-rounded">
                  help
                </span>
              }>
                <MenuList>
                  <MenuItem>About Idmsa LoginSystem</MenuItem>
                </MenuList>
              </Menu>
            </div>

            <form className={'App__IdmsaView--IdmsaUi__Content'}>
              <h3 className={'App__IdmsaView--IdmsaUi__Content--Title'}>Login</h3>
              <div className={'App__IdmsaView--IdmsaUi__Content--Fields'}>
                <TextField
                    className={'App__IdmsaView--IdmsaUi__Content--Fields__Field'}
                    type={'text'}
                    placeholder={'Username'}
                    ref={fldUsername}
                    autoComplete={'username'}
                />

                <TextField
                    className={'App__IdmsaView--IdmsaUi__Content--Fields__Field'}
                    type={'password'}
                    placeholder={'Password'}
                    disabled={formDisabled}
                    ref={fldPassword}
                    autoComplete={'current-password'}
                />
              </div>

              <div className={'App__IdmsaView--IdmsaUi__Content--Controls'}>
                <Link href={'#'}>I forgot my account</Link>
                <Button color={'Primary'}>Login</Button>
              </div>
            </form>

            <div className={'App__IdmsaView--IdmsaUi__Footer'}>
              <code className={'App__IdmsaView--IdmsaUi__Footer--InstanceLocation'}>
                process.env.APP_FQDN
              </code>

              <code className={'App__IdmsaView--IdmsaUi__Footer--AppVersion'}>
                {commercial_name} {version}
              </code>
            </div>
          </div>
        </div>
      </>
  )
}