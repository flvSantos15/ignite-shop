import type { AppProps } from 'next/app'
import Image from 'next/image'

import logoImg from '../assets/logo.svg'
import { HiOutlineShoppingBag } from 'react-icons/hi'

import { globalStyles } from '../styles/global'
import { Container, Header } from '../styles/pages/app'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Image src={logoImg} alt="" />
        <div>
          <div>1</div>
          <HiOutlineShoppingBag size="2.5rem" color="#8D8D99" />
        </div>
      </Header>
      <Component {...pageProps} />
    </Container>
  )
}
