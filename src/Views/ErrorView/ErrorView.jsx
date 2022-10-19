import React from 'react'
import './ErrorView.scss'
import ExclamationIcon from '../../Common/Assets/Icons/ExclamationIcon.svg'
import { commercial_name } from '../../../package.json'

export default function ErrorView() {
    return (
        <>
          <div className={'Dynamic__Header'}>
            <h1>ErrorView</h1>
          </div>

          <div className={'Dynamic__Content App__ErrorView'}>
            <div className={'App__ErrorView--Message'}>
              <img className={'App__ErrorView--Message__ExclamationIcon'} alt={"ExclamationIcon"} src={ExclamationIcon} />
              <div className={'App__ErrorView--Message__Intro'}>
                <h1>Unfortunately</h1>
                <h4>{ commercial_name } was crashed and need to be reloaded.</h4>

                <div className={'App__ErrorView--Message__Intro--ErrorCode'}>
                    <p>ErrorCode: <code>404 — ERR_PAGE_NOT_FOUND</code></p>
                </div>
              </div>
            </div>
          </div>
        </>
    );
}