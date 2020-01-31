import React, { useContext } from 'react'
import { Context } from '../context'

export default props => {
  const { loading } = useContext(Context)
  return (
    <li>
      <span>{ JSON.stringify(props) }</span>
      <span>{ loading ? 'loading!' : '' }</span>
    </li>
  )
}
