import React, { createRef } from 'react'
import { Provider } from './context'
import Style from './style'
import Loading from './components/Loading'
import Search from './components/Search'
import CharactersContainer from './components/CharactersContainer'
import Feedback from './components/Feedback'

export default () => {
  const ref = createRef()
  return (
    <Style>
      <Provider>
        <Search ref={ ref } />
        <Loading />
        <CharactersContainer getSearchHeight={ () => ref.current.clientHeight }>
          <Feedback />
        </CharactersContainer>
      </Provider>
    </Style>
  )
}
