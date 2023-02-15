import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Stripe from 'stripe'
import { stripe } from '../lib/stripe'
import { ImageContainer, SuccessContainer } from '../styles/pages/sucess'

import { ProductProps } from '../context/CartContext'

interface ProductPrice {
  price: {
    product: {
      id: string
      description: string
      name: string
      images: string[]
    }
  }
}

interface SuccessProps {
  customerName: string
  products: {
    products: ProductPrice
  }[]
}

export default function Success({ customerName, products }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>
      <SuccessContainer>
        <div className="content">
          {products.map((item, index) => {
            return (
              <ImageContainer
                key={`${item?.products.price.product.id}.${index}`}
              >
                <Image
                  src={item?.products.price?.product?.images[0]}
                  alt=""
                  width={120}
                  height={110}
                />
              </ImageContainer>
            )
          })}
        </div>

        <h1>Compra efetuada!</h1>

        <p>
          Uhull <strong>{customerName}</strong>, sua compra de{' '}
          {products.length > 1
            ? `${products.length} camisetas já estão `
            : `${products.length} camiseta já está `}
          a caminho da sua casa.
        </p>

        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const sessionId = String(query.session_id)

  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'] // pegando tbm os produtos comprados nessa sessão
    // expand: ['line_items', 'line_items.data.price.product'] // pegando tbm os produtos comprados nessa sessão
  })

  const customerName = session.customer_details?.name

  // const productData = session.line_items?.data as unknown as Stripe.Price[]
  const productData = session.line_items?.data

  return {
    props: {
      customerName,
      products: productData?.map((item) => {
        const product = item.price?.product as Stripe.Product
        return {
          products: product
        }
      })
    }
  }
}
