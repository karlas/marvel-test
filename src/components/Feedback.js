import React, { useContext } from 'react'
import { Context } from '../context'

export default () => {
  const { noResults, error } = useContext(Context)
  if (error){
    return <span>
      { `Error: ${ error }`}
    </span>
  }
  if (noResults){
    return <span>No results :(</span>
  }
  return null
}
