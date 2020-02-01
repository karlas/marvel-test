import React, { useContext } from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import { Context } from '../context'

export default ({ name, description, image, wiki }) => {
  const { loading } = useContext(Context)
  return (
    <Grid item xs={ 12 } sm={ 6 } md={ 4 } xl={ 3 }>
      <Card>
        <span>{ name }</span>
        <span>{ description }</span>
        <span>{ image }</span>
        <span>{ wiki }</span>
        <span>{ loading ? 'loading!' : '' }</span>
      </Card>
    </Grid>
  )
}
