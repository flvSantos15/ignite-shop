import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'

import { useKeenSlider } from 'keen-slider/react'
import Stripe from 'stripe'

import { stripe } from '../lib/stripe'
import { HomeContainer, Product } from '../styles/pages/home'

import { HiOutlineShoppingBag } from 'react-icons/hi'

import 'keen-slider/keen-slider.min.css'
import { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { ConvertNumber } from '../utils/ConvertNumber'

interface HomeProps {
  products: {
    id: string
    name: string
    imageUrl: string
    description: string
    price: string
  }[]
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48
    }
  })

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
      <HomeContainer ref={sliderRef} className="keen-slider">
        {products?.map((product) => {
          const price = ConvertNumber(Number(product.price))

          return (
            <Link
              key={product?.id}
              href={`/product/${product?.id}`}
              prefetch={false}
            >
              <Product key={product.id} className="keen-slider__slide">
                <Image
                  src={product?.imageUrl}
                  alt=""
                  width={520}
                  height={480}
                />

                <footer>
                  <div className="details">
                    <strong>{product?.name}</strong>
                    <span>{price}</span>
                  </div>

                  <button className="cart-green-button">
                    <HiOutlineShoppingBag size="1.5rem" color="#fff" />
                  </button>
                </footer>
              </Product>
            </Link>
          )
        })}
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      description: product.description,
      price: Number(price.unit_amount) / 100 // vem em centavos divido por 100
      // price: new Intl.NumberFormat('pt-BR', {
      //   style: 'currency',
      //   currency: 'BRL'
      // }).format(Number(price.unit_amount) / 100) // vem em centavos divido por 100
    }
  })

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2 // 2 hours
  }
}
