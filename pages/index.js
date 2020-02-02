import React from 'react'
import App from '../src/App'
import fetchCharacters from '../src/fetchCharacters'

const Index = props => <App initialFetch={ props } />

Index.getInitialProps = async () => {
  const { REACT_APP_PUBLIC_API_KEY, REACT_APP_PRIVATE_API_KEY } = process.env
  const fetchResult = await fetchCharacters(REACT_APP_PUBLIC_API_KEY, REACT_APP_PRIVATE_API_KEY)
  return {
    ...fetchResult,
    REACT_APP_PUBLIC_API_KEY, 
    REACT_APP_PRIVATE_API_KEY
  }
}

export default Index
