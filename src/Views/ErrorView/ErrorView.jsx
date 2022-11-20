import React, { useContext, useEffect } from 'react'
import './ErrorView.scss'
import ExclamationIcon from '../../Common/Assets/Icons/ExclamationIcon.svg'
import { commercial_name } from '../../../package.json'
import PropTypes from 'prop-types'
import ErrorTypes from '../../Common/Misc/ErrorTypes'
import { StateContext } from '../../Common/Misc/AppContexts'

export default function ErrorView(props) {
  const {applicationState, setApplicationState} = useContext(StateContext)

  useEffect(() => {
    if (props.errorCode === ErrorTypes['520']) setApplicationState({state: 'crashed'})
    console.log(applicationState)
  }, [])

    return (
        <>
          <div className={'Dynamic__Header'}>
            <h1>Application Error</h1>
          </div>

          <div className={'Dynamic__Content App__ErrorView'}>
            <div className={'App__ErrorView--Message'}>
              <img className={'App__ErrorView--Message__ExclamationIcon'} alt={"ExclamationIcon"} src={ExclamationIcon} />
              <div className={'App__ErrorView--Message__Intro'}>
                <h1>Unfortunately</h1>
                <h4>{ commercial_name } was crashed and need to be reloaded.</h4>

                <div className={'App__ErrorView--Message__Intro--ErrorCode'}>
                  { props.errorCode }
                </div>
              </div>
            </div>
          </div>
        </>
    );
}

ErrorView.propTypes = {
    errorCode: PropTypes.oneOf(Object.values(ErrorTypes)),
}

ErrorView.defaultProps = {
  errorCode: ErrorTypes['520'],
}