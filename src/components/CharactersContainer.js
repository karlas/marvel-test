import React, { useContext } from 'react'
import { Context } from '../context'
import CharacterCard from './CharacterCard'

export default () => {
  const { characters } = useContext(Context)
  return (
    <ul>
      { characters.map(character => <CharacterCard key={ character.id } { ...character } />) }
    </ul>
  )
}
