import React from 'react'
import './ErrorView.scss'
import ExclamationIcon from '../../Common/Assets/Icons/ExclamationIcon.svg'

export default function ErrorView() {
    return (
        <>
          <div className={'Dynamic--Header'}>
            <h1>ErrorView</h1>
          </div>

          <div className={'Dynamic--Content ErrorView'} style={{justifyContent: 'center', alignItems: 'center'}}>
            <div className={'ErrorView__Container'}>
              <img className={'ErrorView__ExclamationIcon'} alt={"ExclamationIcon"} src={ExclamationIcon} />
              <div className={'ErrorView__Intro'}>
                <h1>Unfortunately</h1>
                <h4>The view was crashed and need to be reloaded.</h4>
              </div>
            </div>
          </div>
        </>
    );
}