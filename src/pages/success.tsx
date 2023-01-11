import Link from 'next/link'
import { ImageContainer, SuccessContainer } from '../styles/pages/sucess'

export default function Success() {
  return (
    <SuccessContainer>
      <h1>Compra efetuada!</h1>

      <ImageContainer></ImageContainer>

      <p>
        Uhull <strong>Flavio Santos</strong>, sua{' '}
        <strong>Camiseta Beyond the Limits</strong> já está a caminh da sua
        casa.
      </p>

      <Link href="/">Voltar ao catálogo</Link>
    </SuccessContainer>
  )
}
