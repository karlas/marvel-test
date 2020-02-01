import React, { useContext } from 'react'
import styled from 'styled-components'
import { Context } from '../context'

const Text = styled.span`
  margin: 30px 18px;
  color: ${ ({ theme, error }) => error ? theme.palette.primary.main : theme.palette.grey[ '1' ] };
  ${ ({ error }) => error ? 'font-style: italic;' : '' };
`

export default () => {
  const { noResults, error } = useContext(Context)
  if (error){
    return (
      <Text error>
        { `Error: ${ error }` }
      </Text>
    )
  }
  if (noResults){
    return (
      <Text>
        { `No results :(` }
      </Text>
    )
  }
  return null
}
