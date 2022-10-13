import React from 'react'
import './EmptyDataBtn.scss'
import ic_add from '../../Assets/ic_add.svg'

export default function EmptyDataBtn(props) {
  return (
    <div className={['Modules--EmptyDataBtn', props.className].join(' ')}>
      <img src={ic_add} alt={'Add'} />
      <div className={'Modules--EmptyDataBtn__Text'}>
        <h1>No repository yet.</h1>
        <p>Go to Actions and <a href={'#'}>Create a New Repository</a> to get started !</p>
      </div>
    </div>
  )
}