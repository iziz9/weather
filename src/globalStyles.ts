import reset from 'styled-reset'
import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  ${reset}
  /* other styles */

  @font-face {
    font-family: 'SUITE-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/SUITE-Regular.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  body {
    background-color:rgba(0, 0, 0, 0.79);
    font-family: 'SUITE-Regular', sans-serif;
    line-height: 1;
  }

  main {
    width: 1152px;
    margin: 16px auto;
    box-sizing: border-box;
  }
`

export default GlobalStyles
