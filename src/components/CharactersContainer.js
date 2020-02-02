import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'
import { Context } from '../context'
import CharacterCard from './CharacterCard'
import useLayoutEffect from '../useIsomorphicLayoutEffect'

const StyledGrid = styled(Grid)`
  margin-top: 203px;
  @media only screen and (max-width: 581px){ 
    margin-top: 259px;
  }
  @media only screen and (max-width: 352px){ 
    margin-top: 315px;
  }
`

export default ({ children }) => {
  const { characters } = useContext(Context)
  const [ lastResize, setLastResize ] = useState(0)
  useLayoutEffect(() => {
    (typeof window !== 'undefined') && window.addEventListener('resize', () => setLastResize(new Date().getTime()))
  }, [])
  return (
    <StyledGrid container spacing={ 1 }>
      { characters.map(character => <CharacterCard key={ character.id } { ...character } lastResize={ lastResize } />) }
      { children }
    </StyledGrid>
  )
}
