import React, { createContext, useReducer } from 'react'
import fetchCharacters from './fetchCharacters'

const initialState = {
  characters : [],
  noResults : false,
  loading : true,
  error : false,
  search : ''
}

const UPDATE_CHARACTERS = 'UPDATE_CHARACTERS'
const DISPLAY_ERROR = 'DISPLAY_ERROR'
const SET_LOADING = 'SET_LOADING'
const UPDATE_SEARCH = 'UPDATE_SEARCH'

const reducer = (state, { action, payload }) => {
  switch(action){
    case UPDATE_CHARACTERS:
      return { 
        ...state,
        loading : false,
        noResults : payload.length === 0,
        characters : payload
      }
    case DISPLAY_ERROR:
      return {
        ...state,
        loading : false,
        characters : [],
        error : payload
      }
    case SET_LOADING:
      return {
        ...state,
        error : false,
        initial : false,
        loading : true
      }
    case UPDATE_SEARCH:
      return {
        ...state,
        search : payload
      }
    default:
      return { ...state }
  }
}

const initialStateWithInitialFetch = ({ error, characters }) => {
  const action = {
    action : !!error ? DISPLAY_ERROR : UPDATE_CHARACTERS,
    payload : !!error ? error : characters
  }
  return reducer(initialState, action)
}

export const Context = createContext()

export const Provider =({ children, initialFetch }) => {
  const [ state, _dispatch ] = useReducer(reducer, initialStateWithInitialFetch(initialFetch))
  const dispatch = (action, payload) => _dispatch({ action, payload })
  const updateSearch = search => dispatch(UPDATE_SEARCH, search)
  const submit = async () => {
    dispatch(SET_LOADING)
    const { REACT_APP_PUBLIC_API_KEY, REACT_APP_PRIVATE_API_KEY } = initialFetch
    const { error, characters } = await fetchCharacters(REACT_APP_PUBLIC_API_KEY, REACT_APP_PRIVATE_API_KEY, state.search)
    !!error ? dispatch(DISPLAY_ERROR, error) : dispatch(UPDATE_CHARACTERS, characters)
  }
  const actions = { submit, updateSearch }
  const provided = { ...state, actions }
  return (
    <Context.Provider value={ provided }>
      { children }
    </Context.Provider>
  )
}
