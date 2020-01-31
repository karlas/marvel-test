import React, { useContext } from 'react'
import { Context } from '../context'

export default () => {
  const { search, loading, actions } = useContext(Context)
  const { submit, updateSearch } = actions
  const onSubmit = e => {
    e.preventDefault()
    !loading && submit()
  }
  return (
    <form onSubmit={ onSubmit }>
      <input type="text" value={ search } onChange={ e => updateSearch(e.target.value) } />
      <button type="submit" disabled={ loading } onClick={ onSubmit }>
        Search
      </button>
    </form>
  )
}
