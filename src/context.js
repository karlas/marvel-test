import React, { createContext, useEffect, useCallback, useReducer } from 'react'
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

export const Context = createContext()

export const Provider =({ children }) => {
  const [ state, _dispatch ] = useReducer(reducer, initialState)
  const dispatch = (action, payload) => _dispatch({ action, payload })
  const updateSearch = search => dispatch(UPDATE_SEARCH, search)
  const submit = async () => {
    dispatch(SET_LOADING)
    const { error, characters } = await fetchCharacters(state.search)
    !!error ? dispatch(DISPLAY_ERROR, error) : dispatch(UPDATE_CHARACTERS, characters)
  }
  const initialSubmit = useCallback(submit, [])
  useEffect(() => {
    initialSubmit()
  }, [ initialSubmit ])
  const actions = { submit, updateSearch }
  const provided = { ...state, actions }
  return (
    <Context.Provider value={ provided }>
      { children }
    </Context.Provider>
  )
}
