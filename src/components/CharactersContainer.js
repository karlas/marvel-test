import React, { useContext, useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import { Context } from '../context'
import CharacterCard from './CharacterCard'

export default ({ children }) => {
  const { characters } = useContext(Context)
  const [ lastResize, setLastResize ] = useState(0)
  useEffect(() => {
    window.addEventListener('resize', () => setLastResize(new Date().getTime()))
  }, [])
  return (
    <Grid container spacing={ 1 }>
      { characters.map(character => <CharacterCard key={ character.id } { ...character } lastResize={ lastResize } />) }
      { children }
    </Grid>
  )
}
