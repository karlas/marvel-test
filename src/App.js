import React from 'react'
import { Provider } from './context'
import Style from './style'
import Loading from './components/Loading'
import Search from './components/Search'
import CharactersContainer from './components/CharactersContainer'
import Feedback from './components/Feedback'

export default () => {
  return (
    <Style>
      <Provider>
        <Search />
        <Loading />
        <CharactersContainer>
          <Feedback />
        </CharactersContainer>
      </Provider>
    </Style>
  )
}
