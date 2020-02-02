import React, { useContext, forwardRef } from 'react'
import AppBar from '@material-ui/core/AppBar'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import Slide from '@material-ui/core/Slide'
import InputBase from '@material-ui/core/InputBase'
import Button from '@material-ui/core/Button'
import SearchIcon from '@material-ui/icons/Search'
import styled from 'styled-components'
import { Context } from '../context'

const StyledAppBar = styled(AppBar)`
  padding: 0 30px 30px 30px;
  box-shadow: none;
  background-color: ${ ({ theme }) => theme.palette.grey.background };
  & > h1{
    font-weight: 900;
    font-size: 48px;
    line-height: 56px;
    color : ${ ({ theme }) => theme.palette.grey[ '1' ] }; 
  }
`

export const StyledInputBase = styled(InputBase)`
  max-width: 540px !important;
  width: 100%;
  border-radius: 5px;
  padding-right: 0;
  border: 2px solid ${ ({ theme }) => theme.palette.grey[ '4' ] };
  & input{
    background-color: ${ ({ theme }) => theme.palette.common.white };
    padding: 15px;
    border-radius: 5px 0 0 5px;
    color : ${ ({ theme }) => theme.palette.grey[ '1' ] };
    &::placeholder{
      color : ${ ({ theme }) => theme.palette.grey[ '2' ] };
    }
  }
  & button{
    height: 49px;
    margin: 0;
    box-shadow: none !important;
  }
`

const HideOnScroll = ({ children, window }) => {
  const trigger = useScrollTrigger({ target: window ? window() : undefined });
  return (
    <Slide appear={ false } direction="down" in={ !trigger }>
      { children }
    </Slide>
  )
}

export default () => {
  const { search, loading, actions } = useContext(Context)
  const { submit, updateSearch } = actions
  const onSubmit = e => {
    e.preventDefault()
    !loading && submit()
  }
  const InputBaseProps = {
    type : 'text',
    value : search,
    placeholder : 'Name of character',
    inputProps : { 'aria-label' : 'naked' },
    onChange : e => updateSearch(e.target.value),
    endAdornment : (
      <Button color="primary" variant="contained" type="submit" disabled={ loading } onClick={ onSubmit }>
        <SearchIcon/>
      </Button>
    )
  }
  return (
    <HideOnScroll>
      <StyledAppBar>
        <h1>Search your character</h1>
        <form onSubmit={ onSubmit }>
          <StyledInputBase { ...InputBaseProps } /> 
        </form>
      </StyledAppBar>
    </HideOnScroll>
  )
}
