import React, { useContext, useState, useCallback } from 'react'
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'
import { Context } from '../context'
import CharacterCard from './CharacterCard'
import useLayoutEffect from '../useIsomorphicLayoutEffect'

const Wrap = styled.div`
  transition: opacity 0.2s linear;
  opacity: ${ ({ searchHeight }) => !!searchHeight ? 1 : 0 };
  margin-top: ${ ({ searchHeight }) => searchHeight }px;
`

export default ({ children, getSearchHeight }) => {
  const { characters } = useContext(Context)
  const [ lastResize, setLastResize ] = useState(0)
  const [ searchHeight, setSearchHeight ] = useState(0)
  const setMargin = useCallback(() => setSearchHeight(getSearchHeight()), [ getSearchHeight ])
  useLayoutEffect(() => {
    (typeof window !== 'undefined') && window.addEventListener('resize', () => {
      setLastResize(new Date().getTime())
      setMargin()
    })
    setMargin()
  }, [ setMargin ])
  return (
    <Wrap searchHeight={ searchHeight }>
      <Grid container spacing={ 1 }>
        { characters.map(character => <CharacterCard key={ character.id } { ...character } lastResize={ lastResize } />) }
        { children }
      </Grid>
    </Wrap>
  )
}
