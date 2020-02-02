import React, { useContext, useState, useRef } from 'react'
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import { Context } from '../context'
import useLayoutEffect from '../useIsomorphicLayoutEffect'

const StyledCard = styled(Card)`
  border: 2px solid ${ ({ theme }) => theme.palette.grey['4'] };
  border-radius: 5px;
  box-shadow: none;
  ${ ({ loading }) => loading ? 'filter: blur(1px) brightness(0.5) grayscale(100%);' : '' }
  & > div{
    height : 0;
    padding-bottom: calc((2/3) * 100%);
    width: 100%;
    position: relative;
  }
  &:hover{
    box-shadow: -1px 3px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
  }
`

const ThumbnailDiv = styled.div`
  background-color: ${ ({ theme }) => theme.palette.grey['1'] };
  background-size: cover;
  transition: filter 0.5s linear;
`

const Thumbnail = ({ url }) => {
  const [ prefetchUrl, setPrefetchUrl ] = useState(false)
  useLayoutEffect(() => {
    const img = new Image()
    img.onload = () => setPrefetchUrl(url)
    img.src = url
    return () => {
      img.onload = () => null
    }
  }, [ url ])
  const style = {
    backgroundImage : prefetchUrl ? `url(${ prefetchUrl })` : 'none',
    filter: `brightness(${ prefetchUrl ? 1 : 0 })`
  }
  return <ThumbnailDiv style={ style } />
}

const Container = styled.div`
  padding: 24px;
`

const Name = styled.span`
  font-weight: bold;
  font-size: 24px;
  color: ${ ({ theme }) => theme.palette.grey[ '1' ] };
  line-height: 135%;
  margin-bottom: 0.25em;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
`

const Description = styled(Name)`
  font-weight: 500;
  font-size: 18px;
  color: ${ ({ theme }) => theme.palette.grey[ '2' ] };
  white-space: unset; 
  display: -webkit-box; 
  -webkit-line-clamp: ${ ({ descriptionClamp }) => descriptionClamp };
  -webkit-box-orient: vertical;
  ${ ({ noDescription }) => noDescription ? 'font-style: italic;' : '' }
`

const WikiLinkWrap = styled.a`
  border-radius: 5px;
  background-color: ${ ({ theme }) => theme.palette.grey['1'] };
  border: 2px solid ${ ({ theme }) => theme.palette.grey['1'] };
  color : ${ ({ theme }) => theme.palette.common.white };
  position: absolute;
  right: 24px;
  bottom: 24px;
  font-weight: bold;
  font-size: 18px;
  padding: 12px 22px;
  text-decoration: none;
  display: flex;
  justify-content: space-around;
  align-items: center;
  transition: all 0.1s linear;
  & svg{
    margin-left: 14px;
  }
  &:hover{
    color: ${ ({ theme }) => theme.palette.grey['1'] };
    background-color: ${ ({ theme }) => theme.palette.common.white };
  }
`

const WikiLink = ({ href }) => {
  return (
    <WikiLinkWrap href={ href } target="_blank">
      <span>Read more</span>
      <ArrowForwardIcon />
    </WikiLinkWrap>
  )
}

export default ({ name, description, image, wiki, lastResize }) => {
  const { loading } = useContext(Context)
  const [ descriptionClamp, setDescriptionClamp ] = useState(1)
  const ref = useRef()
  const noDescription = description.length === 0
  useLayoutEffect(() => {
    setDescriptionClamp(Math.floor(ref.current.clientHeight / 100) + (wiki ? 0 : 3))
  }, [ lastResize, wiki ])
  return (
    <Grid item xs={ 12 } sm={ 6 } md={ 4 } xl={ 3 }>
      <StyledCard loading={ loading ? 'loading' : undefined }>
          <Thumbnail url={ image } />
          <div ref={ ref }>
            <Container>
              <Name>{ name }</Name>
              <Description noDescription={ noDescription } descriptionClamp={ descriptionClamp }>
                { noDescription ? '(No description available)' : description }
              </Description>
              { wiki ? <WikiLink href={ wiki } /> : null }
            </Container>
          </div>
      </StyledCard>
    </Grid>
  )
}
