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
            <div className={'App__ErrorView--Container'}>
              <img className={'App__ErrorView--ExclamationIcon'} alt={"ExclamationIcon"} src={ExclamationIcon} />
              <div className={'App__ErrorView--Intro'}>
                <h1>Unfortunately</h1>
                <h4>{ commercial_name } was crashed and need to be reloaded.</h4>
              </div>
            </div>
          </div>
        </>
    );
}