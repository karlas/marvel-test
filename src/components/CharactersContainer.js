import React, { useContext } from 'react'
import Grid from '@material-ui/core/Grid'
import { Context } from '../context'
import CharacterCard from './CharacterCard'

export default ({ children }) => {
  const { characters } = useContext(Context)
  return (
    <Grid container spacing={ 3 }>
      { characters.map(character => <CharacterCard key={ character.id } { ...character } />) }
      { children }
    </Grid>
  )
}
