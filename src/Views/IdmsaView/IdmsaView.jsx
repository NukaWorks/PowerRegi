import React, { createRef, useEffect, useRef } from 'react'
import './IdmsaView.scss'
import { Button, Link, Menu, MenuItem, MenuList, TextField, Text } from '@powerws/uikit'
import { commercial_name, version } from '../../../package.json'
import axios from 'axios'
import { AppEndpoints } from '../../App'

async function login(username, passwd) {
  return await axios.post(
      `${AppEndpoints.api}/idmsa/login`,
      {username: username, passwd: passwd}
  ).then(res => {
    console.log(res.data)
  })
}

export default function IdmsaView(props) {
  const [formDisabled, setFormDisabled] = React.useState({type: 'partial'})
  let fldUsername = createRef()
  let fldPassword = createRef()
  let submitBtn = createRef()

  const handleSubmit = e => {
    setFormDisabled({type: 'all'})
    login(fldUsername.current.value, fldPassword.current.value)
        .then(res => {
          setTimeout(() => setFormDisabled({type: 'none'}), 350)
        })
        .catch(err => {
          setTimeout(() => setFormDisabled({type: 'none'}), 350)
          console.error(err)
        })
  }

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
                  <MenuItem>About Idmsa...</MenuItem>
                </MenuList>
              </Menu>
            </div>

            <form className={'App__IdmsaView--IdmsaUi__Content'}>
              <Text
                  className={'App__IdmsaView--IdmsaUi__Content--Title'}
                  disabled={formDisabled.type === 'all'}
              >
                Login
              </Text>
              <div className={'App__IdmsaView--IdmsaUi__Content--Fields'}>
                <TextField
                    className={'App__IdmsaView--IdmsaUi__Content--Fields__Field'}
                    type={'text'}
                    placeholder={'Username'}
                    disabled={formDisabled.type === 'all'}
                    ref={fldUsername}
                    autoComplete={'username'}
                    onInput={e => {
                      if ((e.target.value.length > 0)) {
                        setFormDisabled({type: 'none'})
                      } else {
                        setFormDisabled({type: 'partial'})
                      }
                    }}
                    onKeyPress={e => {
                      if (e.key === 'Enter') handleSubmit(e)
                    }}
                />

                <TextField
                    className={'App__IdmsaView--IdmsaUi__Content--Fields__Field'}
                    type={'password'}
                    placeholder={'Password'}
                    disabled={formDisabled.type === 'partial' || formDisabled.type === 'all'}
                    ref={fldPassword}
                    autoComplete={'current-password'}
                    onKeyPress={e => {
                      if (e.key === 'Enter') handleSubmit(e)
                    }}
                />
              </div>

              <div className={'App__IdmsaView--IdmsaUi__Content--Controls'}>
                <Link
                    disabled={formDisabled.type === 'all'}
                    href={'#'}
                >
                  I forgot my account
                </Link>
                <Button
                    ref={submitBtn}
                    color={'Primary'}
                    disabled={formDisabled.type === 'all'}
                    onClick={handleSubmit}
                >
                  Login
                </Button>
              </div>
            </form>

            <div className={'App__IdmsaView--IdmsaUi__Footer'}>
              <code className={'App__IdmsaView--IdmsaUi__Footer--InstanceLocation'}>
                {props.data.domain}
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