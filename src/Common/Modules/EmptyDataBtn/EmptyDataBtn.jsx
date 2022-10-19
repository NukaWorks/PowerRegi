import React from 'react'
import './EmptyDataBtn.scss'
import ic_add from '../../Assets/Icons/AddIcon.svg'
import { commercial_name } from '../../../../package.json'

export default function EmptyDataBtn(props) {
  return (
    <div className={['Modules__EmptyDataBtn', props.className].join(' ')}>
      <img src={ic_add} alt={'Add'} />
      <div className={'Modules__EmptyDataBtn--Text'}>
        <h1>No repository yet.</h1>
        <p>Welcome to { commercial_name }, <b>add a new repository</b> to get started !</p>
      </div>
    </div>
  )
}