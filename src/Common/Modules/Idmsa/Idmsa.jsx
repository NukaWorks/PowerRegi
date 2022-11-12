import React, { useContext, useEffect, useRef } from 'react'
import { Button, Link, Menu, MenuItem, MenuList, Text, TextField } from '@powerws/uikit'
import { commercial_name, version } from '../../../../package.json'
import { useQuery } from '../../Misc/Hooks'
import { AuthContext, DataContext } from '../../Misc/AppContexts'
import Cookies from 'js-cookie'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import { AppEndpoints } from '../../../App'
import './Idmsa.scss'

export default function Idmsa() {
  const [formDisabled, setFormDisabled] = React.useState({type: 'partial', includes: ['submit']})
  let fldUsername = useRef(null)
  let fldPassword = useRef(null)
  let submitBtn = useRef(null)
  let formContent = useRef(null)
  let query = useQuery()
  const authContext = useContext(AuthContext)
  const dataContext = useContext(DataContext)

  useEffect(() => {
    console.log(Cookies.get('idmsa'), Cookies.get('session'))
  }, [])

  const handleSubmit = e => {
    fldUsername.current.value = fldUsername.current.value.trim()
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

  if (authContext.isLogged) {
    // Redirect to origin if logged in
    let redir = query.get('redirect')
    if (!redir) return <Navigate to={'/home'}/>
    else return (<Navigate to={redir} replace={true}/>)
  } else {
    return (
        <div className={'Module--IdmsaUi'}>
          <div className={'Module--IdmsaUi__Header'}>
            <h1 className={'Module--IdmsaUi__Header--Title'}>Hi ! 👋</h1>
            <Menu className={'Module--IdmsaUi__Header--HelpIcon'} title={
              <span className="material-symbols-rounded">
                  help
                </span>
            }>
              <MenuList>
                <MenuItem>About Idmsa...</MenuItem>
              </MenuList>
            </Menu>
          </div>

          <form ref={formContent} className={'Module--IdmsaUi__Content'}>
            <Text
                className={'Module--IdmsaUi__Content--Title'}
                disabled={formDisabled.type === 'all'}
            >
              Login
            </Text>
            <div className={'Module--IdmsaUi__Content--Fields'}>
              <TextField
                  className={'Module--IdmsaUi__Content--Fields__Field'}
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
                  className={'Module--IdmsaUi__Content--Fields__Field'}
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

            <div className={'Module--IdmsaUi__Content--Controls'}>
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

          <div className={'Module--IdmsaUi__Footer'}>
            <code className={'Module--IdmsaUi__Footer--InstanceLocation'}>
              {dataContext.data.domain}
            </code>

            <code className={'Module--IdmsaUi__Footer--AppVersion'}>
              {commercial_name} {version}
            </code>
          </div>
        </div>
    )
  }
}

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