import React from 'react'
import './EmptyDataBtn.scss'
import ic_add from '../../Assets/ic_add.svg'
import { Link } from '@powerws/uikit'

export default function EmptyDataBtn(props) {
  return (
    <div className={['Modules--EmptyDataBtn', props.className].join(' ')}>
      <img src={ic_add} alt={'Add'} />
      <div className={'Modules--EmptyDataBtn__Text'}>
        <h1>No repository yet.</h1>
        <p>Go to Actions and <Link href={'#'}>Create a New Repository</Link> to get started !</p>
      </div>
    </div>
  )
}