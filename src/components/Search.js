import React, { useContext } from 'react'
import AppBar from '@material-ui/core/AppBar'
import styled from 'styled-components'
import { Context } from '../context'

const StyledAppBar = styled(AppBar)`
  height: 280px;
  box-shadow: none;
`

export default () => {
  const { search, loading, actions } = useContext(Context)
  const { submit, updateSearch } = actions
  const onSubmit = e => {
    e.preventDefault()
    !loading && submit()
  }
  return (
    <StyledAppBar position="sticky">
      <form onSubmit={ onSubmit }>
        <input type="text" value={ search } onChange={ e => updateSearch(e.target.value) } />
        <button type="submit" disabled={ loading } onClick={ onSubmit }>
          Search
        </button>
      </form>
    </StyledAppBar>
  )
}
