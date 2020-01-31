import React from 'react'
import { Provider } from './context'
import Loading from './components/Loading'
import Search from './components/Search'
import CharactersContainer from './components/CharactersContainer'
import Feedback from './components/Feedback'

export default () => {
  return (
    <Provider>
      <Search />
      <Loading />
      <CharactersContainer />
      <Feedback />
    </Provider>
  )
}
