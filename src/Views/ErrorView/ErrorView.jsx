import React from 'react'
import './ErrorView.scss'
import ExclamationIcon from '../../Common/Assets/Icons/ExclamationIcon.svg'
import { commercial_name } from '../../../package.json'
import PropTypes from 'prop-types'
import ErrorTypes from '../../Common/Misc/ErrorTypes'

export default function ErrorView(props) {
    return (
        <>
          <div className={'Dynamic__Header'}>
            <h1>Ooops</h1>
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