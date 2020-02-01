import React, { useContext } from 'react'
import styled from 'styled-components'
import { Context } from '../context'

const Text = styled.span`
  margin: 1.25em 0.75em;
  color: ${ ({ theme, error }) => error ? theme.palette.primary.main : theme.palette.common.black };
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
