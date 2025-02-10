import reset from 'styled-reset'
import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  ${reset}
  /* other styles */

  main {
    max-width: 1024px;
    margin: auto;
    padding: 16px;
    box-sizing: border-box;
  }
`

export default GlobalStyles
