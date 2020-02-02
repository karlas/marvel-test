import React, { useContext } from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'
import { Context, Provider } from '../../src/context'
import * as FetchCharacters from '../../src/fetchCharacters'

const initialCharacters = [
  { id : 1, name : 'Kirk' },
  { id : 2, name : 'Spock' }
]
const newCharacters = [
  { id : 3, name : 'Bones' }
]

const Test = ({ characters, submit }) => (
  <button onClick={ submit }>
    { characters.length }
  </button>
)

const TestWithContext = () => {
  const { characters, actions } = useContext(Context)
  return <Test characters={ characters } submit={ actions.submit } />
}

const TestApp = () => {
  const initialFetch = { characters : initialCharacters }
  return (
    <Provider initialFetch={ initialFetch }>
      <TestWithContext />
    </Provider>
  )
}

describe('Context: Provider updates', () => {
  beforeAll(() => {
    jest.spyOn(FetchCharacters, 'default').mockImplementation(() => new Promise(resolve => {
      setTimeout(() => resolve({ characters : newCharacters }), 100)
    }))
  })
  it('Context values are correctly updated after a submit', async () => {
    const component = mount(<TestApp />)
    expect(component.find(Test).props().characters.length).toEqual(2)
    await act(async () => {
      await component.find(Test).props().submit()
    })
    component.update()
    expect(component.find(Test).props().characters.length).toEqual(1)
  })
})