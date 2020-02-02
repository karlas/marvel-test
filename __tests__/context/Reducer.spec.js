import { reducer } from '../../src/context'

const state = {
  characters : [
    { id : 1, name : 'Kirk' },
    { id : 2, name : 'Spock' }
  ],
  noResults : false
}

describe('Context: Reducer', () => {
  it('Characters are emptied after receiving an error', () => {
    const state = {
      characters : [
        { id : 1, name : 'Kirk' },
        { id : 2, name : 'Spock' }
      ]
    }
    const newState = reducer(state, { action : 'DISPLAY_ERROR', payload : 'Khan' })
    expect(newState.characters.length).toEqual(0)
  })
  it('"No results" flag is true after receving empty characters payload', () => {
    const newState = reducer(state, { action : 'UPDATE_CHARACTERS', payload : [] })
    expect(newState.noResults).toEqual(true)
  })
})