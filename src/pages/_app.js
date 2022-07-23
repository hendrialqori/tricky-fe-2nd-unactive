import { Wrapper } from '../global-state/store'
import '../../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return(
    <Wrapper>
        <Component {...pageProps} />
    </Wrapper>
  )
}

export default MyApp
