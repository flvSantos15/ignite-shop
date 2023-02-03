import type { AppProps } from 'next/app'
import { CartDrawer } from '../components/CartDrawer'
import { Header } from '../components/Header'

import { CartProvider } from '../context/CartContext'

import { globalStyles } from '../styles/global'
import { Container } from '../styles/pages/app'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Container>
        <Header />
        <CartDrawer />
        <Component {...pageProps} />
      </Container>
    </CartProvider>
  )
}
