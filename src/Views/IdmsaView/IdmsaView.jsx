import React, { useEffect, useRef } from 'react'
import './IdmsaView.scss'
import { Button, Link, Menu, MenuItem, MenuList, Text, TextField } from '@powerws/uikit'
import { commercial_name, version } from '../../../package.json'
import axios from 'axios'
import { AppEndpoints } from '../../App'
import Cookies from 'js-cookie'

async function login(username, passwd) {
  if (!passwd.length > 0) {
    throw new Error('Password is empty')
  }

  return await axios.post(
      `${AppEndpoints.api}/idmsa/login`,
      {username: username, passwd: passwd}
  ).then(res => {
    console.log(res.data)
  })
}

export default function IdmsaView(props) {
  const [formDisabled, setFormDisabled] = React.useState({type: 'partial', includes: ['submit']})
  let fldUsername = useRef(null)
  let fldPassword = useRef(null)
  let submitBtn = useRef(null)
  let formContent = useRef(null)

  useEffect(() => {
    console.log(Cookies.get('idmsa'), Cookies.get('session'))
  }, [])

  const handleSubmit = e => {
    if (!fldUsername.current.value.length > 0) return false

    setFormDisabled({type: 'all'})
    login(fldUsername.current.value, fldPassword.current.value)
        .then(res => {
          setTimeout(() => setFormDisabled({type: 'none', includes: []}), 350)
        })
        .catch(err => {
          setTimeout(() => setFormDisabled({type: 'none', includes: []}), 350)

          // Shake the form
          setTimeout(() => {
            formContent.current.style.animation = 'shake 0.1s cubic-bezier(.1,1.25,.95,.31)' +
                ' infinite'
            setTimeout(() => formContent.current.style.animation = 'none', 300)
          }, 350)
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

            <form ref={formContent} className={'App__IdmsaView--IdmsaUi__Content'}>
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
                        setFormDisabled({type: 'none', includes: []})
                      } else {
                        setFormDisabled({type: 'partial', includes: ['submit']})
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
                    disabled={formDisabled.type === 'all' || formDisabled.includes[0] === 'submit'}
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