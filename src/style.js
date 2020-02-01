import React from 'react'
import { createGlobalStyle, ThemeProvider as StyledComponentsThemeProvider } from 'styled-components'
import { createMuiTheme, StylesProvider, ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#EB2328'
    }
  }
})

const GlobalStyle = createGlobalStyle`
  html{
    height: 100%;
  }
  body{
    margin: 0;
    padding: 0;
    min-height: 100%;
    font-family: ${ ({ theme }) => theme.typography.fontFamily };
  }
  #root{
    margin: 0;
    height: 100vh;
    width: calc(100% - 60px);
    margin: 0 30px;
  }
`

export default ({ children }) => (
  <MuiThemeProvider theme={ theme }>
    <StyledComponentsThemeProvider theme={ theme }>
      <StylesProvider injectFirst>
        { children }
        <GlobalStyle />
      </StylesProvider>
    </StyledComponentsThemeProvider>
  </MuiThemeProvider>
)
