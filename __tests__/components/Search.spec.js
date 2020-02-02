import * as ReactAll from 'react'
import { shallow } from 'enzyme'
import Search, { StyledInputBase } from '../../src/components/Search'
 
const searchText = 'Spock'
let component

describe('Component: Search', () => {
  beforeAll(() => {
    jest.spyOn(ReactAll, 'useContext').mockImplementation(() => ({ 
      search : searchText,
      actions : {}
    }))
    component = shallow(<Search />)
  })
  it('Input value is same as context "search" value', () => {
    expect(component.find(StyledInputBase).props().value).toEqual(searchText)
  })
  it('contains a header with "Search your character"', () => {
    expect(component.containsMatchingElement(<h1>Search your character</h1>)).toEqual(true)
  })
})