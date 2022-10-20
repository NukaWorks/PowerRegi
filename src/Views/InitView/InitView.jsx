import React from 'react'
import './InitView.scss'

export default function InitView() {
  return (
      <>
        <div className={'Dynamic__Header'}>
          <h1>Loading</h1>
        </div>

        <div className={'Dynamic__Content App__InitView'}>
            <p>Loading...</p>
        </div>
      </>
  )
}