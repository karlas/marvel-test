import React, { useContext } from 'react'
import { Context } from '../context'

export default () => {
  const { loading } = useContext(Context)
  return (
    <span>
      { loading ? 'Loading...' : '' }
    </span>
  )
}
