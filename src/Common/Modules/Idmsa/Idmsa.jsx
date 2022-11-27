import React, { useContext, useLayoutEffect, useRef } from 'react'
import { Button, Link, Menu, MenuItem, MenuList, Text, TextField } from '@powerws/uikit'
import { commercial_name, version } from '../../../../package.json'
import { useQuery } from '../../Misc/Hooks'
import { AuthContext, DataContext, StateContext } from '../../Misc/AppContexts'
import Cookies from 'js-cookie'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import jwdec from 'jwt-decode'
import { AppEndpoints } from '../../../App'
import './Idmsa.scss'

let ax = null

export default function Idmsa() {
  const [formDisabled, setFormDisabled] = React.useState({type: 'partial', includes: ['submit']})
  let fldUsername = useRef(null)
  let fldPassword = useRef(null)
  let submitBtn = useRef(null)
  let formContent = useRef(null)
  let query = useQuery()
  const dataContext = useContext(DataContext)
  const {logged, setLogged} = useContext(AuthContext)
  const {applicationState, setApplicationState} = useContext(StateContext)

  let logoutQuery = query.get('logout')

  ax = axios.create({
    baseURL: `${AppEndpoints.api}/idmsa`,
    headers: {
      'Authorization': `${Cookies.get('idmsa')}`
    }
  })

  useLayoutEffect(() => {
    if (applicationState['state'] !== 'loading')
    setApplicationState({state: 'loading'})
    
    if (Cookies.get('idmsa') && Cookies.get('session')) {
      if (logoutQuery && logged) {
        logout()
            .then(() => {
              clearSession()
              setLogged(false)
              setApplicationState({state: 'done'})
            })
            .catch(err => {
              setApplicationState({state: 'crashed'})
              console.error(err)
            })
      } else {
        const jw = jwdec(Cookies.get('idmsa'))
        if (jw.exp > Math.floor(Date.now())) clearSession()
          ax.post(`/session`, {
            uid: jw.u,
            session: Cookies.get('session'),
            idmsa: Cookies.get('idmsa')
          })
              .then(res => {
                if (res.data === 'OK') {
                  setLogged(true)
                } else {
                  clearSession()
                  setLogged(false)
                }
                setApplicationState({state: 'done'})
              })
              .catch(err => {
                if (err.response.status === 401) {
                  clearSession()
                  setLogged(false)
                  setApplicationState({state: 'done'})
                } else setApplicationState({state: 'crashed'})
                console.error(err)
              })
      }
    } else {
      clearSession()
      setLogged(false)
      setApplicationState({state: 'done'})
    }
  }, [])

  const handleSubmit = e => {
    fldUsername.current.value = fldUsername.current.value.trim()
    if (!fldUsername.current.value.length > 0) return false

    setFormDisabled({type: 'all'})
    login(fldUsername.current.value, fldPassword.current.value)
        .then(res => {
          setTimeout(() => setFormDisabled({type: 'none', includes: []}), 350)
          if (res.data === 'Created') setLogged(true)
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

  if (logged) {
    // Redirect to origin if logged in
    let redir = query.get('redirect')
    if (!redir) return <Navigate to={'/home'}/>
    else return (<Navigate to={redir} replace={true}/>)
  } else {
    return (
        <div className={'Module__IdmsaUi'}>
          <div className={'Module__IdmsaUi--Header'}>
            <h1 className={'Module__IdmsaUi--Header__Title'}>Hi ! 👋</h1>
            <Menu className={'Module__IdmsaUi--Header__HelpIcon'} title={
              <span className="material-symbols-rounded">
                  help
                </span>
            }>
              <MenuList>
                <MenuItem>About Idmsa...</MenuItem>
              </MenuList>
            </Menu>
          </div>

          <form ref={formContent} className={'Module__IdmsaUi--Content'}>
            <Text
                className={'Module__IdmsaUi--Content__Title'}
                disabled={formDisabled.type === 'all'}
            >
              Login
            </Text>
            <div className={'Module__IdmsaUi--Content__Fields'}>
              <TextField
                  className={'Module__IdmsaUi--Content__Fields--Field'}
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
                  className={'Module__IdmsaUi--Content__Fields--Field'}
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

            <div className={'Module__IdmsaUi--Content__Controls'}>
              <Link
                  disabled={formDisabled.type === 'all'}
                  href={'/idmsa?logout=true'}
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

          <div className={'Module__IdmsaUi--Footer'}>
            <code className={'Module__IdmsaUi--Footer__InstanceLocation'}>
              {dataContext.data.domain}
            </code>

            <code className={'Module__IdmsaUi--Footer__AppVersion'}>
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

  return await ax.post(
      `/login`,
      {username: username, passwd: passwd}
  ).then(res => {
    return res
  })
}

function clearSession() {
  Cookies.remove('idmsa')
  Cookies.remove('session')
}

async function logout() {
  return await ax.post(`/logout`)
}
