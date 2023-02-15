import Image from 'next/image'
import { useContext, useEffect, useMemo, useState } from 'react'

import axios from 'axios'

import { IoCloseSharp } from 'react-icons/io5'
import { CartContext, ProductProps } from '../../context/CartContext'
import { ConvertNumber } from '../../utils/ConvertNumber'

import {
  Container,
  Products,
  Product,
  PriceDetail,
  CustomButton
} from './style'

export function CartDrawer() {
  const {
    isCartOpen,
    setIsCartOpen,
    cartProducts,
    removeProductFromCart,
    cartItems
  } = useContext(CartContext)

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)

  const handleCloseCart = () => {
    setIsCartOpen(isCartOpen === 'isOpen' ? 'isClosed' : 'isOpen')
  }

  const handleRemoveItemFromCart = async (product: ProductProps) => {
    await removeProductFromCart({ ...product, quantity: 1 })
  }

  const handleBuyProduct = async () => {
    try {
      setIsCreatingCheckoutSession(true)

      const { data } = await axios.post('/api/checkout', {
        products: cartProducts
      })

      // const { data } = await axios.post('/api/checkout', {
      //   priceId: product.defaultPriceId
      // })
      const { checkoutUrl } = data

      window.location.href = checkoutUrl
    } catch (err) {
      // Conectar com uma ferramenata de observabilidade (Sentry | Datadog)
      setIsCreatingCheckoutSession(false)
      alert('Falha ao redirecionar ao checkout')
    }
  }

  const totalPrice = useMemo(() => {
    const total = cartItems.reduce((acc, curr) => {
      const price = Number(curr.price)

      return acc + price
    }, 0)

    return ConvertNumber(Number(total))
  }, [cartItems])

  const isFinisheButtonDisabled = cartProducts.length === 0

  return (
    <Container display={isCartOpen}>
      <div className="overlay">
        <div className="svg">
          <IoCloseSharp size="1.5rem" onClick={handleCloseCart} />
        </div>

        <h2>Sacola de compras</h2>

        <Products>
          {cartItems.map((product, index) => {
            const price = ConvertNumber(Number(product.price))
            return (
              <Product key={`${product.id}.${index}`}>
                <div className="img">
                  <Image alt="" src={product.imageUrl} width={94} height={94} />
                </div>
                <div className="frame">
                  <h4>{product.name}</h4>
                  <span>{price}</span>
                  <button
                    className=""
                    onClick={() => handleRemoveItemFromCart(product)}
                  >
                    Remover
                  </button>
                </div>
              </Product>
            )
          })}
        </Products>

        <PriceDetail>
          <div>
            <h4>Quantidade</h4>
            <span>Valor total</span>
          </div>
          <div>
            <h3>
              {cartItems.length > 1
                ? `${cartItems.length} itens`
                : `${cartItems.length} item`}
            </h3>
            <h2>{totalPrice}</h2>
          </div>
        </PriceDetail>

        <CustomButton
          disabled={isFinisheButtonDisabled || isCreatingCheckoutSession}
          onClick={handleBuyProduct}
        >
          {isCreatingCheckoutSession ? 'Carregando...' : 'Finalizar compra'}
        </CustomButton>
      </div>
    </Container>
  )
}
