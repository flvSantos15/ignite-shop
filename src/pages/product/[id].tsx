import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import Head from 'next/head'

import axios from 'axios'
import Stripe from 'stripe'
import { stripe } from '../../lib/stripe'

import {
  ImageContainer,
  ProductContainer,
  ProductDetails
} from '../../styles/pages/product'
import { useContext, useState } from 'react'
import { CartContext } from '../../context/CartContext'

interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    description: string
    price: string
    defaultPriceId: string
  }
}

export default function Product({ product }: ProductProps) {
  const { addProductToCart } = useContext(CartContext)

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)

  const handleBuyProduct = async () => {
    try {
      setIsCreatingCheckoutSession(true)

      const { data } = await axios.post('/api/checkout', {
        priceId: product.defaultPriceId
      })
      const { checkoutUrl } = data

      window.location.href = checkoutUrl
    } catch (err) {
      // Conectar com uma ferramenata de observabilidade (Sentry | Datadog)
      setIsCreatingCheckoutSession(false)
      alert('Falha ao redirecionar ao checkout')
    }
  }

  const handleAddToCart = async () => {
    addProductToCart(product)
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image src={product?.imageUrl} alt="" width={520} height={480} />
        </ImageContainer>
        <ProductDetails>
          <h1>{product?.name}</h1>
          <span>{product?.price}</span>

          <p>{product?.description}</p>

          <button
            disabled={isCreatingCheckoutSession}
            onClick={handleAddToCart}
          >
            Colocar na sacola
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  // nos paths passo o id dos produtos que quero que sejam carregados mais rapidos
  // se quero os 10 mais acessados por exemplo, passo o id dos 10
  // e o fallback é pra dizer o que acontece enquanto os dados ainda não estão prontos

  return {
    paths: [{ params: { id: 'prod_N6vn5JTaMbjd4i' } }],
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const productId = params?.id as string

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format((price.unit_amount as number) / 100),
        description: product.description,
        defaultPriceId: price.id
      }
    },
    revalidate: 60 * 60 * 1 // 1 hour
  }
}
