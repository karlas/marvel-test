import React, { useContext, useLayoutEffect, useState, useCallback } from 'react'
import Grid from '@material-ui/core/Grid'
import { Context } from '../context'
import CharacterCard from './CharacterCard'

export default ({ children, getSearchHeight }) => {
  const { characters } = useContext(Context)
  const [ lastResize, setLastResize ] = useState(0)
  const [ searchHeight, setSearchHeight ] = useState(0)
  const setMargin = useCallback(() => setSearchHeight(getSearchHeight()), [ getSearchHeight ])
  useLayoutEffect(() => {
    window.addEventListener('resize', () => {
      setLastResize(new Date().getTime())
      setMargin()
    })
    setMargin()
  }, [ setMargin ])
  return (
    <Grid container spacing={ 1 } style={{ marginTop : searchHeight }}>
      { characters.map(character => <CharacterCard key={ character.id } { ...character } lastResize={ lastResize } />) }
      { children }
    </Grid>
  )
}
