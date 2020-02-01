import React, { useContext } from 'react'
import styled from 'styled-components'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Context } from '../context'

const Wrap = styled.div`
  position: absolute;
  top: 200px;
  bottom: 0;
  left: 0;
  right: 0;
  height: 70px;
  width: 70px;
  background-color: #fff;
  z-index: 9999;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  pointer-events: none;
  & svg{
    color: ${ ({ theme }) => theme.palette.grey[ '1'] };
  }
`

export default () => {
  const { loading } = useContext(Context)
  if (!loading){
    return null
  }
  return (
    <Wrap>
      <CircularProgress />
    </Wrap>
  )
}
